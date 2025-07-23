/**
 * @file album.ts
 * @description Album endpoints for Last.fm API
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

import { BaseEndpoint } from './baseEndpoint'
import { 
  LastFmAlbum, 
  LastFmTag,
  LastFmSearchResults,
  AlbumSearchOptions,
  LastFmRequestOptions,
  InfoOptions,
  TopTagsOptions
} from '../types'

export class AlbumEndpoints extends BaseEndpoint {
  /**
   * Get album information
   */
  async getInfo(artist: string, album: string, options: InfoOptions = {}): Promise<{ album: LastFmAlbum }> {
    const params = this.cleanParams({
      artist,
      album,
      ...options
    })
    return this.request('album.getInfo', params)
  }

  /**
   * Get top tags for an album
   */
  async getTopTags(artist: string, album: string, options: TopTagsOptions = {}): Promise<{ toptags: { tag: LastFmTag[] } }> {
    const params = this.cleanParams({
      artist,
      album,
      ...options
    })
    return this.request('album.getTopTags', params)
  }

  /**
   * Search for an album
   */
  async search(album: string, options: LastFmRequestOptions = {}): Promise<LastFmSearchResults> {
    const params = this.cleanParams({
      album,
      ...options
    })
    return this.request('album.search', params)
  }
}