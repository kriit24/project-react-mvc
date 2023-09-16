import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import counterStore from './counter-store';

export function FullAlert(content) {
  counterStore.setFullAlert({
    is_active: true,
    content:
      content !== undefined ? (
        typeof content === 'string' ? (
          <Text>{content}</Text>
        ) : (
          content
        )
      ) : null,
  });
}

export function ShowFullAlert() {
  const [object, setObject] = useState({
    is_active: false,
    content: null,
  });
  counterStore.setFullAlert = setObject;

  const { is_active, content } = object;

  if (!is_active) return null;

  //enum('none', 'slide', 'fade')
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          },
        ]}
      >
        {content}
      </KeyboardAvoidingView>
    </View>
  );
}

export function CloseFullAlert(timeOut = 0, complete) {
  setTimeout(() => {
    if (complete !== undefined) complete();

    counterStore.setFullAlert({
      is_active: false,
      header: null,
      content: null,
    });
  }, timeOut);
}
