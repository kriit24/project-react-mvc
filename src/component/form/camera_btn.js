import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function CameraBtn(props) {
  const [picture, setPicture] = useState(props.placeholder);

  return (
    <TouchableOpacity
      style={props.style}
      onPress={() => {
        props.onPress(setPicture);
      }}
    >
      <Text>{picture !== undefined ? picture : 'Take Picture'}</Text>
    </TouchableOpacity>
  );
}
