import React, { useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import counterStore from './counter-store';
import style from './style';
import css from '../../assets/style';
export function Loader() {
  counterStore.setLoader({
    is_active: true,
  });
}

export function ShowLoader() {
  const [object, setObject] = useState({
    is_active: false,
  });
  counterStore.setLoader = setObject;

  const { is_active } = object;

  if (!is_active) return null;

  //enum('none', 'slide', 'fade')
  return (
    <Modal animationType="none" transparent={true} visible={is_active}>
      <View
        style={[
          css.loader_container,
          css.loader_horizontal,
          style.loader,
          { backgroundColor: 'black', opacity: 0.35, zIndex: 1 },
        ]}
      />
      <View
        style={[
          css.loader_container,
          css.loader_horizontal,
          style.loader,
          { backgroundColor: 'transparent', opacity: 1, zIndex: 2 },
        ]}
      >
        <ActivityIndicator size="large" color="#0467c9" />
      </View>
    </Modal>
  );
}

export function CloseLoader(timeOut = 0, complete) {
  setTimeout(() => {
    if (complete !== undefined) complete();

    counterStore.setLoader({
      is_active: false,
    });
  }, timeOut);
}
