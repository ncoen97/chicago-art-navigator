import React, { useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import useArtworks from '../../hooks/useArtworks';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useDebounce } from '@uidotdev/usehooks';
import ArtworkCover from '../../components/ArtworkCover';

const Search = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { data: getArtworks, isError, isLoading } = useArtworks({ q: debouncedSearch });
  return (
    <View style={styles.root}>
      <TextInput style={styles.search} label="Search" value={search} onChangeText={text => setSearch(text)} />
      <View style={styles.resultsContainer}>
        {!search && !getArtworks?.data.length && (
          <Text style={styles.empty}>Use the input above to search for exciting artwork!</Text>
        )}
        {isLoading ? (
          <ActivityIndicator style={styles.loading} />
        ) : isError ? (
          <Text>Error</Text>
        ) : (
          <FlatList
            data={getArtworks?.data}
            numColumns={2}
            renderItem={artwork => (
              <ArtworkCover key={artwork.item.id} artwork={artwork.item} iiif_url={getArtworks?.config.iiif_url} />
            )}
            keyExtractor={artwork => artwork.title}
            contentContainerStyle={styles.arworksList}
          />
        )}
      </View>
    </View>
  );
};

export default Search;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.background,
    },
    resultsContainer: {
      flex: 1,
      flexDirection: 'column',
      padding: 8,
      paddingTop: 0,
    },
    search: { backgroundColor: colors.input },
    empty: { marginTop: 8 },
    loading: { marginTop: 8 },
    arworksList: {
      display: 'flex',
      alignItems: 'stretch',
      overflowY: 'auto',
    },
  });
