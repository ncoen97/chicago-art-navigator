import React from 'react';
import { IArtwork } from '../types/api';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

interface ArtworkCoverProps {
  artwork: IArtwork;
  iiif_url?: string;
}

const ArtworkCover: React.FC<ArtworkCoverProps> = ({ artwork, iiif_url = 'https://www.artic.edu/iiif/2' }) => {
  const router = useRouter();
  return (
    <Card
      style={styles.card}
      elevation={2}
      onPress={() => router.push({ pathname: `/search/${artwork.id}`, params: { origin: 'search' } })}
    >
      <Card.Cover
        source={{ uri: `${iiif_url}/${artwork.image_id}/full/843,/0/default.jpg` }}
        alt={artwork.thumbnail.alt_text}
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
    margin: 8,
    backgroundColor: 'white',
  },
});
