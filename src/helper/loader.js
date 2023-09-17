import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import css from '../assets/style';

export default function Loader(props) {
  return (
    <View
      style={[
        css.loader_container,
        css.loader_horizontal,
        {
          backgroundColor:
            props !== undefined && props.backgroundColor !== undefined
              ? props.backgroundColor
              : '#FFFFFF',
        },
      ]}
    >
      <ActivityIndicator size="large" color="#1976d2" />
    </View>
  );
}
