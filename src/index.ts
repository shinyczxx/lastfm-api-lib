/**
 * @file index.ts
 * @description Main entry point for lastfm-api-lib
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

// Main API class
export { LastFm } from './main'

// HTTP client for advanced usage
export { LastFmHttpClient } from './httpClient'

// All endpoint classes
export { ArtistEndpoints } from './endpoints/artist'
export { AlbumEndpoints } from './endpoints/album'
export { TrackEndpoints } from './endpoints/track'
export { TagEndpoints } from './endpoints/tag'
export { ChartEndpoints } from './endpoints/chart'

// All types
export * from './types'

// Default export
export { LastFm as default } from './main'