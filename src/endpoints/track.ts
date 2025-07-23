/**
 * @file track.ts
 * @description Track endpoints for Last.fm API
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

import { BaseEndpoint } from './baseEndpoint'
import { 
  LastFmTrack, 
  LastFmTag,
  LastFmSearchResults,
  TrackSearchOptions,
  LastFmRequestOptions,
  InfoOptions,
  SimilarOptions,
  TopTagsOptions
} from '../types'

export class TrackEndpoints extends BaseEndpoint {
  /**
   * Get track correction
   */
  async getCorrection(artist: string, track: string): Promise<{ corrections?: { correction: { track: LastFmTrack } } }> {
    const params = this.cleanParams({ artist, track })
    return this.request('track.getCorrection', params)
  }

  /**
   * Get track information
   */
  async getInfo(artist: string, track: string, options: InfoOptions = {}): Promise<{ track: LastFmTrack }> {
    const params = this.cleanParams({
      artist,
      track,
      ...options
    })
    return this.request('track.getInfo', params)
  }

  /**
   * Get similar tracks
   */
  async getSimilar(artist: string, track: string, options: SimilarOptions = {}): Promise<{ similartracks: { track: LastFmTrack[] } }> {
    const params = this.cleanParams({
      artist,
      track,
      ...options
    })
    return this.request('track.getSimilar', params)
  }

  /**
   * Get top tags for a track
   */
  async getTopTags(artist: string, track: string, options: TopTagsOptions = {}): Promise<{ toptags: { tag: LastFmTag[] } }> {
    const params = this.cleanParams({
      artist,
      track,
      ...options
    })
    return this.request('track.getTopTags', params)
  }

  /**
   * Search for a track
   */
  async search(track: string, options: LastFmRequestOptions = {}): Promise<LastFmSearchResults> {
    const params = this.cleanParams({
      track,
      ...options
    })
    return this.request('track.search', params)
  }
}