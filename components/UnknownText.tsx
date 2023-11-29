import React from 'react';
import { Text, TextProps } from 'react-native-paper';

type UnknownTextProps = TextProps<string> & { isUnknown: boolean; label: string };

const UnknownText: React.FC<UnknownTextProps> = props => {
  const { children, isUnknown, label, ...other } = props;
  return <Text {...other}>{label + (isUnknown ? 'Unknown' : children)}</Text>;
};

export default UnknownText;
