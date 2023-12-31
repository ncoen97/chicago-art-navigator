// Art Institute of Chicago API

export interface IArtwork {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  medium_display: string;
  dimensions: string;
  artist_display: string;
  place_of_origin: string;
  date_display: string;
  exhibition_history: string;
  is_on_view: string;
  thumbnail: {
    lqip: string; // data:image/type;base64
    width: number;
    height: number;
    alt_text: string;
  };
}

export interface IGetArtworks {
  data: IArtwork[];
  config: { iiif_url: string };
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}

export interface IGetArtwork {
  data: IArtwork;
  config: { iiif_url: string };
}
