/**
 * @file chart.ts
 * @description Chart endpoints for Last.fm API
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

import { BaseEndpoint } from './baseEndpoint'
import { 
  LastFmArtist,
  LastFmTrack,
  LastFmTag,
  LastFmRequestOptions
} from '../types'

export class ChartEndpoints extends BaseEndpoint {
  /**
   * Get top artists chart
   */
  async getTopArtists(options: LastFmRequestOptions = {}): Promise<{ artists: { artist: LastFmArtist[] } }> {
    const params = this.cleanParams(options)
    return this.request('chart.getTopArtists', params)
  }

  /**
   * Get top tracks chart
   */
  async getTopTracks(options: LastFmRequestOptions = {}): Promise<{ tracks: { track: LastFmTrack[] } }> {
    const params = this.cleanParams(options)
    return this.request('chart.getTopTracks', params)
  }

  /**
   * Get top tags chart
   */
  async getTopTags(options: LastFmRequestOptions = {}): Promise<{ tags: { tag: LastFmTag[] } }> {
    const params = this.cleanParams(options)
    return this.request('chart.getTopTags', params)
  }
}