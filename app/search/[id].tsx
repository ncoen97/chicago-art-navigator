import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import useArtwork from '../../hooks/useArtwork';
import { BackHandler, Dimensions, Image, StyleSheet, View } from 'react-native';

const SearchItem = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = makeStyles(colors);
  const { id } = useLocalSearchParams();
  const { origin } = useGlobalSearchParams();
  const { data: getArtwork, isLoading, isError } = useArtwork(Number(id));

  useEffect(() => {
    const backAction = () => {
      router.push(origin);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.root}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : isError ? (
        <Text>Error</Text>
      ) : (
        <View style={styles.artworkContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `${getArtwork?.config.iiif_url}/${getArtwork?.data.image_id}/full/843,/0/default.jpg`,
            }}
            alt={getArtwork?.data.thumbnail.alt_text}
          />
          <View style={styles.descriptionContainer}>
            <Text>{getArtwork?.data.title}</Text>
            <Text>{getArtwork?.data.artist_title}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchItem;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.background,
    },
    loading: { marginTop: 8 },
    artworkContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    image: {
      flex: 0.5,
      resizeMode: 'contain',
      width: Dimensions.get('window').width,
      height: undefined,
    },
    descriptionContainer: {
      flex: 0.5,
      padding: 0,
    },
  });
