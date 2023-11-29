import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { IArtwork } from '../types/api';
import ArtworkCover from '../components/ArtworkCover';
import { Link } from 'expo-router';

const favorites = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const favs = useSelector<RootState, IArtwork[]>(state => state.favorites.artworks);
  return (
    <View style={styles.root}>
      {favs.length ? (
        <FlatList
          data={favs}
          numColumns={2}
          renderItem={artwork => <ArtworkCover origin="favorites" key={artwork.item.id} artwork={artwork.item} />}
          keyExtractor={artwork => artwork.id.toString()}
          contentContainerStyle={styles.artworksList}
          columnWrapperStyle={styles.artworkColumn}
        />
      ) : (
        <Link style={styles.empty} href={{ pathname: '/index/' }}>
          Click here to search for some artwork!
        </Link>
      )}
    </View>
  );
};

export default favorites;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.background,
    },
    empty: { margin: 16, color: '#1B95E0' },
    artworksList: {
      display: 'flex',
      alignItems: 'stretch',
      overflowY: 'auto',
      gap: 16,
      padding: 16,
    },
    artworkColumn: { gap: 16 },
  });
