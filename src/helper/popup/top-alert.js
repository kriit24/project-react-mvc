import React, { useState } from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import counterStore from './counter-store';
import style from './style';

export function TopAlert(content) {
  counterStore.setTopAlert({
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

export function ShowTopAlert() {
  const [object, setObject] = useState({
    is_active: false,
    content: null,
  });
  counterStore.setTopAlert = setObject;

  const { is_active, content } = object;

  let modalView = {
    flex: 1,
    margin: 0,
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    minWidth: 'auto',
    width: 'auto',
    alignSelf: 'stretch',
    flexDirection: 'row',
  };

  if (!is_active) return null;

  //enum('none', 'slide', 'fade')
  return (
    <View
      style={{ top: 40, right: 5, position: 'absolute', zIndex: 4, flex: 1 }}
    >
      <View style={[style.modalView, modalView]}>{content}</View>
    </View>
  );
}

export function CloseTopAlert(timeOut = 0, complete) {
  setTimeout(() => {
    if (complete !== undefined) complete();

    counterStore.setTopAlert({
      is_active: false,
      header: null,
      content: null,
    });
  }, timeOut);
}
