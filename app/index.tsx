import React, { useMemo, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import useArtworks from '../hooks/useArtworks';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useDebounce } from '@uidotdev/usehooks';
import ArtworkCover from '../components/ArtworkCover';

const Search = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [search, setSearch] = useState('');
  const q = useDebounce(search, 300);

  const { data: getArtworks, isError, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useArtworks({ q });

  const artworks = useMemo(() => getArtworks?.pages.map(page => page.data).flat(), [getArtworks?.pages]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.root}>
      <TextInput style={styles.search} label="Search" value={search} onChangeText={text => setSearch(text)} />
      <View style={styles.resultsContainer}>
        {isLoading ? (
          <ActivityIndicator style={styles.loading} />
        ) : isError ? (
          <Text>Error</Text>
        ) : (
          <FlatList
            data={artworks}
            numColumns={2}
            renderItem={artwork => (
              <ArtworkCover
                origin="/"
                key={artwork.item.id}
                artwork={artwork.item}
                iiif_url={getArtworks?.pages[0].config.iiif_url}
              />
            )}
            keyExtractor={artwork => artwork.id.toString()}
            contentContainerStyle={styles.arworksList}
            columnWrapperStyle={styles.artworkColumn}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
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
    empty: { marginTop: 16 },
    loading: { marginTop: 16 },
    arworksList: {
      display: 'flex',
      alignItems: 'stretch',
      overflowY: 'auto',
      gap: 16,
      padding: 16,
    },
    artworkColumn: { gap: 16 },
  });
