import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import counterStore from './counter-store';
import style from './style';
import css from '../../assets/style';

let closeAlertTimeout = null;

export function Alert(content, header) {
  counterStore.setAlert({
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

export function ShowAlert() {
  const [object, setObject] = useState({
    is_active: false,
    header: null,
    content: null,
  });
  counterStore.setAlert = setObject;

  const { is_active, header, content } = object;
  let modalView = css.dimensions(style.modalView, {
    margin: 10,
  });

  if (!is_active) return null;

  //enum('none', 'slide', 'fade')
  return (
    <Modal animationType="none" transparent={true} visible={is_active}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[style.centeredView]}
      >
        <View style={[modalView]}>
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
          <View style={[style.modalViewContent, {paddingTop: header !== undefined ? 0 : style.modalViewContent.paddingTop}]}>{content}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export function CloseAlert(timeOut = 0, complete) {

  if( closeAlertTimeout )
    clearTimeout(closeAlertTimeout);

  closeAlertTimeout = setTimeout(() => {
    if (complete !== undefined) complete();

    counterStore.setAlert({
      is_active: false,
      header: null,
      content: null,
    });
  }, timeOut);
}
