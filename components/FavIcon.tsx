import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface FavIconProps {
  toggleFav: () => void;
  isFav: boolean;
}

const FavIcon: React.FC<FavIconProps> = ({ isFav, toggleFav }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(isFav ? 1.5 : 1, { duration: 300 });
  }, [isFav]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: interpolate(scale.value, [1, 1.5], [1, 0.7], Extrapolate.CLAMP),
    };
  });

  return (
    <Animated.View style={[styles.icon, animatedStyle]}>
      <MaterialCommunityIcons
        backgroundColor="transparent"
        underlayColor="gray"
        onPress={toggleFav}
        name={isFav ? 'heart' : 'heart-outline'}
        size={24}
        color="red"
      />
    </Animated.View>
  );
};

export default FavIcon;

const styles = StyleSheet.create({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
    paddingRight: 8,
  },
});
