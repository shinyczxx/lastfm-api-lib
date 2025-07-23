/**
 * @file tag.ts
 * @description Tag endpoints for Last.fm API
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

import { BaseEndpoint } from './baseEndpoint'
import { 
  LastFmTag,
  LastFmAlbum,
  LastFmArtist,
  LastFmTrack,
  LastFmRequestOptions,
  TagOptions,
  InfoOptions
} from '../types'

export class TagEndpoints extends BaseEndpoint {
  /**
   * Get tag information
   */
  async getInfo(tag: string, options: InfoOptions = {}): Promise<{ tag: LastFmTag }> {
    const params = this.cleanParams({
      tag,
      ...options
    })
    return this.request('tag.getInfo', params)
  }

  /**
   * Get similar tags
   */
  async getSimilar(tag: string): Promise<{ similartags: { tag: LastFmTag[] } }> {
    const params = this.cleanParams({ tag })
    return this.request('tag.getSimilar', params)
  }

  /**
   * Get top albums for a tag
   */
  async getTopAlbums(tag: string, options: LastFmRequestOptions = {}): Promise<{ albums: { album: LastFmAlbum[] } }> {
    const params = this.cleanParams({
      tag,
      ...options
    })
    return this.request('tag.getTopAlbums', params)
  }

  /**
   * Get top artists for a tag
   */
  async getTopArtists(tag: string, options: LastFmRequestOptions = {}): Promise<{ topartists: { artist: LastFmArtist[] } }> {
    const params = this.cleanParams({
      tag,
      ...options
    })
    return this.request('tag.getTopArtists', params)
  }

  /**
   * Get top tracks for a tag
   */
  async getTopTracks(tag: string, options: LastFmRequestOptions = {}): Promise<{ tracks: { track: LastFmTrack[] } }> {
    const params = this.cleanParams({
      tag,
      ...options
    })
    return this.request('tag.getTopTracks', params)
  }

  /**
   * Get top tags
   */
  async getTopTags(): Promise<{ toptags: { tag: LastFmTag[] } }> {
    return this.request('tag.getTopTags')
  }
}