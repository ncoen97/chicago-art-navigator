// Art Institute of Chicago API

export interface IArtwork {
  id: number;
  title: string;
  artist_title: string;
  thumbnail: {
    lqip: string; // data:image/type;base64
    width: number;
    height: number;
    alt_text: string;
  };
}
