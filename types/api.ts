// Art Institute of Chicago API

export interface IArtwork {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
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
}

export interface IGetArtwork {
  data: IArtwork;
  config: { iiif_url: string };
}
