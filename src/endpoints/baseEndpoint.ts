/**
 * @file baseEndpoint.ts
 * @description Base class for Last.fm API endpoints
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

import { LastFmHttpClient } from '../httpClient'

export abstract class BaseEndpoint {
  protected httpClient: LastFmHttpClient

  constructor(httpClient: LastFmHttpClient) {
    this.httpClient = httpClient
  }

  /**
   * Make a request to the API
   */
  protected async request(method: string, params: Record<string, any> = {}): Promise<any> {
    return this.httpClient.request(method, params)
  }

  /**
   * Clean up undefined/null parameters
   */
  protected cleanParams(params: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {}
    
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        cleaned[key] = value
      }
    }
    
    return cleaned
  }
}