import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import counterStore from './counter-store';
import style from './style';
import css from '../../assets/style';

export function BottomModal(content, header) {
  counterStore.setBottomModal({
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

export function ShowBottomModal() {
  const [object, setObject] = useState({
    is_active: false,
    header: null,
    content: null,
  });
  counterStore.setBottomModal = setObject;

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
          <View style={[style.modalViewHeader]}>
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
            <View style={[{ width: 50, alignSelf: 'flex-end' }]}>
              <Pressable
                style={[
                  style.button,
                  css.btn_danger,
                  { marginTop: 3, marginRight: 3 },
                ]}
                onPress={() => {
                  counterStore.setBottomModal({
                    is_active: false,
                    header: null,
                    content: null,
                  });
                }}
              >
                <Text style={style.textStyle}>X</Text>
              </Pressable>
            </View>
          </View>
          <View style={[style.modalViewContent, { paddingTop: 10 }]}>
            {content}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export function CloseBottomModal(timeOut = 0, complete) {
  setTimeout(() => {
    if (complete !== undefined) complete();

    counterStore.setBottomModal({
      is_active: false,
      header: null,
      content: null,
    });
  }, timeOut);
}
