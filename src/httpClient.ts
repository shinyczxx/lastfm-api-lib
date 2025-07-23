/**
 * @file httpClient.ts
 * @description HTTP client for making requests to Last.fm API
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestOptions {
  method?: 'GET' | 'POST'
  params?: Record<string, any>
  headers?: Record<string, string>
  retries?: number
}

export interface LastFmApiError extends Error {
  status?: number
  response?: any
  code?: number
}

// HTTP status codes that should be retried
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504])

export class LastFmHttpClient {
  private client: AxiosInstance
  private apiKey: string
  private readonly baseURL = 'https://ws.audioscrobbler.com/2.0/'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || ''
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'User-Agent': 'lastfm-api-lib/1.0.0',
        'Accept': 'application/json',
      },
    })

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => this.handleResponseError(error)
    )
  }

  /**
   * Set API key for requests
   */
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey
  }

  /**
   * Clear the API key
   */
  public clearApiKey(): void {
    this.apiKey = ''
  }

  /**
   * Make a request to the Last.fm API
   */
  public async request(
    method: string,
    params: Record<string, any> = {},
    options: RequestOptions = {}
  ): Promise<any> {
    if (!this.apiKey) {
      throw new Error('API key is required')
    }

    const requestParams = {
      method,
      api_key: this.apiKey,
      format: 'json',
      ...params,
    }

    const config: AxiosRequestConfig = {
      method: options.method || 'GET',
      params: requestParams,
      headers: options.headers,
    }

    try {
      const response = await this.client.request(config)
      
      // Check for Last.fm API errors in response
      if (response.data?.error) {
        const error = new Error(response.data.message || 'Last.fm API error') as LastFmApiError
        error.code = response.data.error
        error.status = response.status
        throw error
      }

      return response.data
    } catch (error: any) {
      if (error.isAxiosError) {
        const lastFmError = new Error(
          error.response?.data?.message || error.message || 'Request failed'
        ) as LastFmApiError
        lastFmError.status = error.response?.status
        lastFmError.response = error.response?.data
        throw lastFmError
      }
      throw error
    }
  }

  /**
   * Handle response errors with retries for certain status codes
   */
  private async handleResponseError(error: any): Promise<any> {
    if (
      error.response?.status &&
      RETRYABLE_STATUS_CODES.has(error.response.status) &&
      error.config &&
      !error.config._retryCount
    ) {
      error.config._retryCount = 1
      
      // Add delay for rate limiting
      if (error.response.status === 429) {
        await this.delay(1000)
      }
      
      return this.client.request(error.config)
    }
    
    return Promise.reject(error)
  }

  /**
   * Delay helper for rate limiting
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Get the HTTP client instance
   */
  public getHttpClient(): AxiosInstance {
    return this.client
  }
}