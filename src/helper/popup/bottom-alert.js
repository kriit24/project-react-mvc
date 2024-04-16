import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from 'react-native';
import counterStore from './counter-store';
import style from './style';
import css from '../../assets/style';

let closeBottomAlertTimeout = null;

export function BottomAlert(content, header) {
  counterStore.setBottomAlert({
    is_active: true,
    header:
      header !== undefined ? (
        typeof header === 'string' ? (
          <Text>{header}</Text>
        ) : (
          header
        )
      ) : null,
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

export function ShowBottomAlert() {
  const [object, setObject] = useState({
    is_active: false,
    header: null,
    content: null,
  });
  counterStore.setBottomAlert = setObject;

  const { is_active, header, content } = object;
  let modalView = css.dimensions(style.modalView, {
    margin: 10,
  });

  if (!is_active) return null;

  //enum('none', 'slide', 'fade')
  return (
    <Modal animationType="slide" transparent={true} visible={is_active}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[style.centeredView, { justifyContent: 'flex-end' }]}
      >
        <View
          style={[
            modalView,
            { marginBottom: 0, minHeight: '45%', minWidth: '85%' },
          ]}
        >
          <View
            style={[
              style.modalViewHeader,
              { height: header === undefined || header === null ? 0 : 'auto' },
            ]}
          >
            <View
              style={[
                {
                  flex: 1,
                  flexBasis: 'auto',
                  flexShrink: 0,
                  flexGrow: 1,
                  padding: 5,
                  justifyContent: 'center',
                },
              ]}
            >
              {header}
            </View>
          </View>
          <View style={[style.modalViewContent]}>{content}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export function CloseBottomAlert(timeOut = 0, complete) {
 if(closeBottomAlertTimeout)
   clearTimeout(closeBottomAlertTimeout);

  closeBottomAlertTimeout = setTimeout(() => {
    if (complete !== undefined) complete();

    counterStore.setBottomAlert({
      is_active: false,
      header: null,
      content: null,
    });
  }, timeOut);
}
