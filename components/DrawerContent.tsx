import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image } from 'react-native';

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        style={{ height: 80, width: 80, marginHorizontal: 10, marginVertical: 4 }}
        source={require('../assets/images/artic-logo.png')}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
