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
    // Validate API key format if provided
    if (apiKey && !this.isValidApiKeyFormat(apiKey)) {
      console.warn('LastFm: API key format appears invalid')
    }

    this.httpClient = new LastFmHttpClient(apiKey)

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