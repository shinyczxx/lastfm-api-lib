/**
 * @file artist.ts
 * @description Artist endpoints for Last.fm API
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

import { BaseEndpoint } from './baseEndpoint'
import { 
  LastFmArtist, 
  LastFmAlbum, 
  LastFmTrack, 
  LastFmTag,
  LastFmSearchResults,
  ArtistSearchOptions,
  LastFmRequestOptions,
  InfoOptions,
  SimilarOptions,
  TopTagsOptions
} from '../types'

export class ArtistEndpoints extends BaseEndpoint {
  /**
   * Get artist correction
   */
  async getCorrection(artist: string): Promise<{ corrections?: { correction: { artist: LastFmArtist } } }> {
    const params = this.cleanParams({ artist })
    return this.request('artist.getCorrection', params)
  }

  /**
   * Get artist information
   */
  async getInfo(artist: string, options: InfoOptions = {}): Promise<{ artist: LastFmArtist }> {
    const params = this.cleanParams({
      artist,
      ...options
    })
    return this.request('artist.getInfo', params)
  }

  /**
   * Get similar artists
   */
  async getSimilar(artist: string, options: SimilarOptions = {}): Promise<{ similarartists: { artist: LastFmArtist[] } }> {
    const params = this.cleanParams({
      artist,
      ...options
    })
    return this.request('artist.getSimilar', params)
  }

  /**
   * Get top albums for an artist
   */
  async getTopAlbums(artist: string, options: LastFmRequestOptions = {}): Promise<{ topalbums: { album: LastFmAlbum[] } }> {
    const params = this.cleanParams({
      artist,
      ...options
    })
    return this.request('artist.getTopAlbums', params)
  }

  /**
   * Get top tags for an artist
   */
  async getTopTags(artist: string, options: TopTagsOptions = {}): Promise<{ toptags: { tag: LastFmTag[] } }> {
    const params = this.cleanParams({
      artist,
      ...options
    })
    return this.request('artist.getTopTags', params)
  }

  /**
   * Get top tracks for an artist
   */
  async getTopTracks(artist: string, options: LastFmRequestOptions = {}): Promise<{ toptracks: { track: LastFmTrack[] } }> {
    const params = this.cleanParams({
      artist,
      ...options
    })
    return this.request('artist.getTopTracks', params)
  }

  /**
   * Search for an artist
   */
  async search(artist: string, options: LastFmRequestOptions = {}): Promise<LastFmSearchResults> {
    const params = this.cleanParams({
      artist,
      ...options
    })
    return this.request('artist.search', params)
  }
}