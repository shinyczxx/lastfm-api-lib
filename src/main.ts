/**
 * @file main.ts
 * @description Main Last.fm API class with constructor pattern for organized API access
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 *
 * @description
 * Constructor-based Last.fm API wrapper that provides organized methods for
 * interacting with the Last.fm Web API. Supports artists, albums, tracks, tags, and charts.
 *
 * @usage
 * ```javascript
 * const lastfm = new LastFm(apiKey);
 * const artistInfo = await lastfm.artist.getInfo('Radiohead');
 * const albumInfo = await lastfm.album.getInfo('Radiohead', 'OK Computer');
 * const topTracks = await lastfm.track.search('Creep');
 * ```
 */

import { LastFmHttpClient } from './httpClient'
import { ArtistEndpoints } from './endpoints/artist'
import { AlbumEndpoints } from './endpoints/album'
import { TrackEndpoints } from './endpoints/track'
import { TagEndpoints } from './endpoints/tag'
import { ChartEndpoints } from './endpoints/chart'

// Endpoint classes mapping for optimized initialization
const ENDPOINT_CLASSES = {
  artist: ArtistEndpoints,
  album: AlbumEndpoints,
  track: TrackEndpoints,
  tag: TagEndpoints,
  chart: ChartEndpoints,
} as const

export class LastFm {
  private httpClient: LastFmHttpClient

  // Endpoint groups
  public artist!: ArtistEndpoints
  public album!: AlbumEndpoints
  public track!: TrackEndpoints
  public tag!: TagEndpoints
  public chart!: ChartEndpoints

  constructor(apiKey?: string) {
    // Try to get API key from environment if not provided
    const resolvedApiKey = apiKey || this.getApiKeyFromEnvironment()
    
    // Validate API key format if provided
    if (resolvedApiKey && !this.isValidApiKeyFormat(resolvedApiKey)) {
      console.warn('LastFm: API key format appears invalid')
    }

    this.httpClient = new LastFmHttpClient(resolvedApiKey)

    // Initialize endpoint groups using optimized pattern
    this.initializeEndpoints()
  }

  /**
   * Initialize all endpoint groups
   */
  private initializeEndpoints(): void {
    for (const [name, EndpointClass] of Object.entries(ENDPOINT_CLASSES)) {
      ;(this as any)[name] = new EndpointClass(this.httpClient)
    }
  }

  /**
   * Get API key from environment variables
   * Works with multiple build tools and environments
   */
  private getApiKeyFromEnvironment(): string | undefined {
    // Environment variable names to try (in order of preference)
    const envNames = [
      'LASTFM_API_KEY',           // Generic
      'VITE_LASTFM_API_KEY',      // Vite
      'REACT_APP_LASTFM_API_KEY', // Create React App
      'NEXT_PUBLIC_LASTFM_API_KEY', // Next.js
    ]
    
    for (const envName of envNames) {
      let value: string | undefined

      // Method 1: Try globalThis for environment access
      try {
        // Check for globalThis.process.env (Node.js environments)
        if ((globalThis as any).process?.env) {
          value = (globalThis as any).process.env[envName]
          if (value) {
            console.log(`LastFm: Using API key from process.env.${envName}`)
            return value
          }
        }
      } catch (e) {
        // Ignore and try next method
      }

      // Method 2: Try runtime environment injection
      try {
        if ((globalThis as any).__ENV__) {
          value = (globalThis as any).__ENV__[envName]
          if (value) {
            console.log(`LastFm: Using API key from globalThis.__ENV__.${envName}`)
            return value
          }
        }
      } catch (e) {
        // Ignore and try next method
      }

      // Method 3: Try window environment (browser)
      try {
        if (typeof window !== 'undefined' && (window as any).__ENV__) {
          value = (window as any).__ENV__[envName]
          if (value) {
            console.log(`LastFm: Using API key from window.__ENV__.${envName}`)
            return value
          }
        }
      } catch (e) {
        // Ignore and continue
      }
    }
    
    // Note: import.meta.env detection is intentionally omitted here
    // as it causes build issues. Client applications should pass the
    // API key explicitly: new LastFm(import.meta.env.VITE_LASTFM_API_KEY)
    
    return undefined
  }

  /**
   * Basic API key format validation
   */
  private isValidApiKeyFormat(apiKey: string): boolean {
    // Last.fm API keys are typically 32 character hexadecimal strings
    return typeof apiKey === 'string' && /^[a-f0-9]{32}$/i.test(apiKey)
  }

  /**
   * Set API key for API requests
   */
  public setApiKey(apiKey: string): void {
    this.httpClient.setApiKey(apiKey)
  }

  /**
   * Clear the API key
   */
  public clearApiKey(): void {
    this.httpClient.clearApiKey()
  }

  /**
   * Make a raw API request
   */
  public async request(
    method: string,
    params: Record<string, any> = {}
  ): Promise<any> {
    return this.httpClient.request(method, params)
  }

  /**
   * Get the HTTP client instance for advanced usage
   */
  public getHttpClient(): LastFmHttpClient {
    return this.httpClient
  }

  /**
   * Clean up resources and clear API key
   */
  public destroy(): void {
    this.clearApiKey()
    // Clear any cached data if endpoints have cleanup methods
    Object.values(ENDPOINT_CLASSES).forEach((_, key) => {
      const endpoint = (this as any)[Object.keys(ENDPOINT_CLASSES)[key]]
      if (endpoint && typeof endpoint.cleanup === 'function') {
        endpoint.cleanup()
      }
    })
  }
}