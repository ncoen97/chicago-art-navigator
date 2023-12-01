import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import useArtwork from '../../hooks/useArtwork';
import { BackHandler, Dimensions, Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addArtwork, removeArtwork } from '../../redux/slices/favoritesSlice';
import { RootState } from '../../redux/slices/rootSlice';
import { IArtwork } from '../../types/api';
import { useIsFocused } from '@react-navigation/native';
import UnknownText from '../../components/UnknownText';
import { ScrollView } from 'react-native-gesture-handler';
import FavIcon from '../../components/FavIcon';

const SearchItem = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const isFocused = useIsFocused();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const favs = useSelector<RootState, IArtwork[]>(state => state.favorites.artworks);
  const isFav = useMemo(() => favs.some(fav => fav.id === Number(id)), [favs, id]);
  const { origin } = useGlobalSearchParams();
  const { data: getArtwork, isLoading, isError } = useArtwork(Number(id));

  useEffect(() => {
    if (isFocused) {
      const backAction = () => {
        //@ts-ignore we manually check this value is correct when passing the prop
        router.push(origin);
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        backHandler.remove();
      };
    }
  }, [origin]);

  const toggleFav = () =>
    //@ts-ignore We make sure it's not undefined while rendering
    isFav ? dispatch(removeArtwork(getArtwork?.data.id)) : dispatch(addArtwork(getArtwork?.data));

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
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{getArtwork?.data.title}</Text>
                <UnknownText style={styles.subtitle} label="" isUnknown={!getArtwork?.data.artist_title}>
                  {getArtwork?.data.artist_title}
                </UnknownText>
              </View>
              <FavIcon isFav={isFav} toggleFav={toggleFav} />
            </View>
            <ScrollView>
              <Text>This artwork is currently{getArtwork?.data.is_on_view ? '' : ' not'} on display.</Text>
              <UnknownText label="Place of origin: " isUnknown={!getArtwork?.data.place_of_origin}>
                {getArtwork?.data.place_of_origin}
              </UnknownText>
              <UnknownText label="Date: " isUnknown={!getArtwork?.data.date_display}>
                {getArtwork?.data.date_display}
              </UnknownText>
              <UnknownText label="History: " isUnknown={!getArtwork?.data.exhibition_history}>
                {getArtwork?.data.exhibition_history}
              </UnknownText>
              <UnknownText label="Dimensions: " isUnknown={!getArtwork?.data.dimensions}>
                {getArtwork?.data.dimensions}
              </UnknownText>
              <UnknownText label="Substances/Materials: " isUnknown={!getArtwork?.data.medium_display}>
                {getArtwork?.data.medium_display}
              </UnknownText>
            </ScrollView>
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
      display: 'flex',
      flex: 1,
      backgroundColor: colors.background,
    },
    loading: { marginTop: 16 },
    artworkContainer: {
      display: 'flex',
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'contain',
      width: Dimensions.get('window').width,
      height: undefined,
      flexGrow: 1,
    },
    contentContainer: {
      display: 'flex',
      flex: 1,
      padding: 16,
      overflowY: 'auto',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    titleContainer: {
      display: 'flex',
      flex: 1,
      flexGrow: 1,
    },
    title: {
      fontWeight: '700',
      fontSize: 18,
    },
    subtitle: {
      fontSize: 16,
    },
    detailsContainer: {
      display: 'flex',
      flex: 1,
      flexGrow: 1,
      padding: 16,
      backgroundColor: 'blue',
    },
  });
