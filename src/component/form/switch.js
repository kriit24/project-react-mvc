import React, { useState } from 'react';
import { Switch, View, Text, Platform } from 'react-native';
import css from '../../assets/style';

export default function FormSwitch(props) {
  const [IsEnabled, setIsEnabled] = useState(props.value);
  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      props.onChange(!previousState);
      return !previousState;
    });
  let text =
    props.text !== undefined ? (
      typeof props.text === 'string' ? (
        <Text
          style={[
            css.form_control,
            {
              justifyContent: 'center',
              paddingTop: 13,
              marginLeft: 20,
              borderWidth: 0,
            },
          ]}
        >
          {props.text}
        </Text>
      ) : (
        props.text
      )
    ) : null;

  let trackColor = {
    false: '#D3D3D3',
    true: '#259041',
  };
  let thumbColor = IsEnabled ? '#f4f3f4' : '#f4f3f4';
  let float = {};
  if (props.float !== undefined && props.float == 'left')
    float = {
      justifyContent: 'flex-start',
      paddingLeft: 20,
      paddingTop: 20,
      paddingBottom: 10,
    };
  if (props.float !== undefined && props.float == 'right')
    float = {
      justifyContent: 'flex-end',
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 10,
    };

  let scale = Platform.OS === 'ios' ? 1 : 1.5;

  return (
    <View
      style={[
        { flexDirection: 'row', justifyContent: 'center' },
        props.style,
        props.float === undefined ? {} : float,
      ]}
    >
      <Switch
        trackColor={trackColor}
        thumbColor={thumbColor}
        ios_backgroundColor="#767577"
        onValueChange={toggleSwitch}
        value={IsEnabled}
        style={[{ transform: [{ scaleX: scale }, { scaleY: scale }] }]}
        {...props.attr}
      />
      {text}
    </View>
  );
}
