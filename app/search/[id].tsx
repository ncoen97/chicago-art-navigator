import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Button, Icon, Text, useTheme } from 'react-native-paper';
import useArtwork from '../../hooks/useArtwork';
import { BackHandler, Dimensions, Image, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addArtwork, removeArtwork } from '../../redux/slices/favoritesSlice';
import { RootState } from '../../redux/slices/rootSlice';
import { IArtwork } from '../../types/api';

const SearchItem = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const favs = useSelector<RootState, IArtwork[]>(state => state.favorites.artworks);
  const isFav = useMemo(() => favs.some(fav => fav.id === Number(id)), [favs, id]);
  const { origin } = useGlobalSearchParams();
  const { data: getArtwork, isLoading, isError } = useArtwork(Number(id));

  useEffect(() => {
    const backAction = () => {
      //@ts-ignore we manually check this value is correct when doing router.push
      router.push(origin);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [origin]);

  //@ts-ignore We make sure it's not undefined while rendering
  const favArtwork = () => dispatch(addArtwork(getArtwork?.data));

  //@ts-ignore We make sure it's not undefined while rendering
  const unfavArtwork = () => dispatch(removeArtwork(getArtwork?.data.id));

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
          <View style={styles.informationContainer}>
            <View style={styles.informationHeaderContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{getArtwork?.data.title}</Text>
                <Text>{getArtwork?.data.artist_title}</Text>
              </View>
              {isFav ? (
                <MaterialCommunityIcons
                  style={styles.icon}
                  backgroundColor="transparent"
                  underlayColor="gray"
                  onPress={unfavArtwork}
                  name="heart"
                  size={24}
                  color="red"
                />
              ) : (
                <MaterialCommunityIcons
                  style={styles.icon}
                  backgroundColor="transparent"
                  underlayColor="gray"
                  onPress={favArtwork}
                  name="heart-outline"
                  size={24}
                  color="red"
                />
              )}
            </View>
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
      backgroundColor: colors.background,
    },
    loading: { marginTop: 8 },
    artworkContainer: {
      flex: 1,
    },
    image: {
      flex: 0.5,
      resizeMode: 'contain',
      width: Dimensions.get('window').width,
      height: undefined,
    },
    informationContainer: {
      display: 'flex',
      flex: 0.5,
      padding: 16,
    },
    informationHeaderContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    titleContainer: {
      display: 'flex',
      flex: 1,
    },
    title: {
      fontWeight: '700',
      fontSize: 16,
    },
    icon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 0,
    },
  });
