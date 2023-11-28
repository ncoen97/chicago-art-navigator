import React from 'react';
import { IArtwork } from '../types/api';
import { Card } from 'react-native-paper';
import { Dimensions, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

interface ArtworkCoverProps {
  artwork: IArtwork;
  iiif_url?: string;
  origin: string;
}

const ArtworkCover: React.FC<ArtworkCoverProps> = ({ artwork, origin, iiif_url = 'https://www.artic.edu/iiif/2' }) => {
  const router = useRouter();
  return (
    <Card style={styles.card} onPress={() => router.push({ pathname: `/search/${artwork.id}`, params: { origin } })}>
      <Card.Cover
        source={{ uri: `${iiif_url}/${artwork.image_id}/full/843,/0/default.jpg` }}
        alt={artwork.thumbnail?.alt_text || ''}
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      />
      <Card.Title title={artwork.title} subtitle={artwork.artist_title} />
    </Card>
  );
};

export default ArtworkCover;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: Dimensions.get('screen').width / 2 - 8 * 2 - 4, // To fix last item styles, we remove gap and padding
    backgroundColor: 'white',
  },
});
