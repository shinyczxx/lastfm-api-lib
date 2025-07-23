/**
 * @file types.ts
 * @description TypeScript types for Last.fm API responses
 * @author Caleb Price
 * @version 1.0.0
 * @date 2025-07-23
 */

// Base types
export interface LastFmImage {
  "#text": string
  size: "small" | "medium" | "large" | "extralarge" | "mega" | ""
}

export interface LastFmTag {
  name: string
  count: number
  url?: string
}

export interface LastFmDate {
  "#text": string
  uts: string
}

export interface LastFmAttr {
  page: string
  perPage: string
  totalPages: string
  total: string
}

// Artist types
export interface LastFmArtist {
  name: string
  mbid?: string
  url: string
  image?: LastFmImage[]
  listeners?: string
  playcount?: string
  bio?: {
    summary: string
    content: string
  }
  similar?: {
    artist: LastFmArtist[]
  }
  tags?: {
    tag: LastFmTag[]
  }
  stats?: {
    listeners: string
    playcount: string
  }
}

// Album types
export interface LastFmAlbum {
  name: string
  artist: string | LastFmArtist
  mbid?: string
  url: string
  image?: LastFmImage[]
  listeners?: string
  playcount?: string
  tracks?: {
    track: LastFmTrack[]
  }
  tags?: {
    tag: LastFmTag[]
  }
  wiki?: {
    published: string
    summary: string
    content: string
  }
}

// Track types
export interface LastFmTrack {
  name: string
  artist: string | LastFmArtist
  album?: string | LastFmAlbum
  mbid?: string
  url: string
  duration?: string
  listeners?: string
  playcount?: string
  image?: LastFmImage[]
  tags?: {
    tag: LastFmTag[]
  }
  wiki?: {
    published: string
    summary: string
    content: string
  }
  streamable?: {
    "#text": string
    fulltrack: string
  }
  toptags?: {
    tag: LastFmTag[]
  }
}

// User types
export interface LastFmUser {
  name: string
  realname?: string
  url: string
  image?: LastFmImage[]
  country?: string
  age?: string
  gender?: string
  subscriber?: string
  playcount?: string
  playlists?: string
  bootstrap?: string
  registered?: LastFmDate
}

// Chart types
export interface LastFmChart {
  artists?: {
    artist: LastFmArtist[]
    "@attr": LastFmAttr
  }
  tracks?: {
    track: LastFmTrack[]
    "@attr": LastFmAttr
  }
  tags?: {
    tag: LastFmTag[]
    "@attr": LastFmAttr
  }
}

// Search result types
export interface LastFmSearchResults {
  results: {
    "opensearch:Query": {
      "#text": string
      role: string
      searchTerms: string
      startPage: string
    }
    "opensearch:totalResults": string
    "opensearch:startIndex": string
    "opensearch:itemsPerPage": string
    artistmatches?: {
      artist: LastFmArtist[]
    }
    albummatches?: {
      album: LastFmAlbum[]
    }
    trackmatches?: {
      track: LastFmTrack[]
    }
    "@attr": {
      for: string
    }
  }
}

// API response wrapper types
export interface LastFmApiResponse<T> {
  [key: string]: T
}

// Common request options
export interface LastFmRequestOptions {
  limit?: number
  page?: number
  autocorrect?: 0 | 1
  user?: string
  lang?: string
}

// Method-specific options
export interface ArtistSearchOptions extends LastFmRequestOptions {
  artist: string
}

export interface AlbumSearchOptions extends LastFmRequestOptions {
  album: string
}

export interface TrackSearchOptions extends LastFmRequestOptions {
  track: string
}

export interface TagOptions extends LastFmRequestOptions {
  tag: string
}

export interface GeoOptions extends LastFmRequestOptions {
  country: string
}

export interface SimilarOptions extends LastFmRequestOptions {
  artist?: string
  track?: string
  mbid?: string
}

export interface TopTagsOptions extends LastFmRequestOptions {
  artist?: string
  album?: string
  track?: string
  mbid?: string
}

export interface InfoOptions extends LastFmRequestOptions {
  artist?: string
  album?: string
  track?: string
  mbid?: string
  username?: string
}