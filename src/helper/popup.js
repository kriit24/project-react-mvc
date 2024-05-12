import {View, Text, TouchableOpacity} from 'react-native';
import counterStore from './popup/counter-store';
import style from './popup/style';
import { Alert, ShowAlert, CloseAlert } from './popup/alert';
import { FullAlert, ShowFullAlert, CloseFullAlert } from './popup/full-alert';
import {
  BottomAlert,
  ShowBottomAlert,
  CloseBottomAlert,
} from './popup/bottom-alert';
import { TopAlert, ShowTopAlert, CloseTopAlert } from './popup/top-alert';
import { Modal, ShowModal, CloseModal } from './popup/modal';
import {
  BottomModal,
  ShowBottomModal,
  CloseBottomModal,
} from './popup/bottom-modal';
import { Loader, ShowLoader, CloseLoader } from './popup/loader';
import { Confirm, CloseConfirm } from './popup/confirm';
import css from '../assets/style';
import {FontAwesome} from "@expo/vector-icons";
import React from "react";

let keyIndex = 1;

function Success(content) {
  keyIndex++;

  if (typeof content === 'string') {
    return (
      <View
        style={[
          css.bg_success,
          style.alertContainer,
          { backgroundColor: '#d1e7dd' },
        ]}
        key={'success' + keyIndex}
      >
        <Text style={[style.textStyle, { color: '#0f5132' }]}>{content}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        css.bg_success,
        style.alertContainer,
        { backgroundColor: '#d1e7dd' },
      ]}
      key={'success' + keyIndex}
    >
      {content}
    </View>
  );
}

function Warning(content) {
  keyIndex++;

  if (typeof content === 'string') {
    return (
      <View
        style={[
          css.bg_warning,
          style.alertContainer,
          { backgroundColor: '#fff3cd' },
        ]}
        key={'warning' + keyIndex}
      >
        <Text style={[style.textStyle, { color: '#664d03' }]}>{content}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        css.bg_warning,
        style.alertContainer,
        { backgroundColor: '#fff3cd' },
      ]}
      key={'warning' + keyIndex}
    >
      {content}
    </View>
  );
}

function Error(content) {
  keyIndex++;

  if (typeof content === 'string') {
    return (
      <View
        style={[
          css.bg_danger,
          style.alertContainer,
          { backgroundColor: '#f8d7da' },
        ]}
        key={'danger' + keyIndex}
      >
        <Text style={[style.textStyle, { color: '#842029' }]}>{content}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        css.bg_danger,
        style.alertContainer,
        { backgroundColor: '#f8d7da' },
      ]}
      key={'danger' + keyIndex}
    >
      {content}
    </View>
  );
}

function SuccessBackground(content) {
  keyIndex++;
  //#0f5132

  if (typeof content === 'string') {
    return (
      <View
        style={[
          style.alertBGContainer,
          { borderColor: '#c3e6cb', backgroundColor: '#d4edda' },
        ]}
        key={'danger-1' + keyIndex}
      >
        <Text style={[style.textStyle, { fontSize: 20, color: '#0f5132' }]}>
          {content}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={[style.alertBGContainer]} key={'danger-1' + keyIndex}>
        {content}
      </View>
    </>
  );
}

function WarningBackground(content) {
  keyIndex++;
  //#664d03

  if (typeof content === 'string') {
    return (
      <View
        style={[
          style.alertBGContainer,
          { borderColor: '#ffeeba', backgroundColor: '#fff3cd' },
        ]}
        key={'danger-1' + keyIndex}
      >
        <Text style={[style.textStyle, { fontSize: 20, color: '#664d03' }]}>
          {content}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={[style.alertBGContainer]} key={'danger-1' + keyIndex}>
        {content}
      </View>
    </>
  );
}

function ErrorBackground(content) {
  keyIndex++;
  //#842029

  if (typeof content === 'string') {
    return (
      <View
        style={[
          style.alertBGContainer,
          { borderColor: '#f5c6cb', backgroundColor: '#f8d7da' },
        ]}
        key={'danger-1' + keyIndex}
      >
        <Text style={[style.textStyle, { fontSize: 20, color: '#842029' }]}>
          {content}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={[style.alertBGContainer]} key={'danger-1' + keyIndex}>
        {content}
      </View>
    </>
  );
}

function CloseBtn(){

    return <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
        style={{padding: 0, borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: css.color_danger.color}}
        onPress={() => {

            Popup.CloseAlert();
        }}>
        <FontAwesome name="close" style={[css.color_danger, {
            fontSize: 26,
            padding: 0,
            margin: 0,
        }]}/>
    </TouchableOpacity>
    </View>;
}

const Popup = {
  init: counterStore.setConfig,
  Alert: Alert,
  ShowAlert: ShowAlert,
  CloseAlert: CloseAlert,
  FullAlert: FullAlert,
  ShowFullAlert: ShowFullAlert,
  CloseFullAlert: CloseFullAlert,
  BottomAlert: BottomAlert,
  ShowBottomAlert: ShowBottomAlert,
  CloseBottomAlert: CloseBottomAlert,
  TopAlert: TopAlert,
  ShowTopAlert: ShowTopAlert,
  CloseTopAlert: CloseTopAlert,
  Modal: Modal,
  ShowModal: ShowModal,
  CloseModal: CloseModal,
  BottomModal: BottomModal,
  ShowBottomModal: ShowBottomModal,
  CloseBottomModal: CloseBottomModal,
  Loader: Loader,
  ShowLoader: ShowLoader,
  CloseLoader: CloseLoader,
  Confirm: Confirm,
  CloseConfirm: CloseConfirm,
  Success: Success,
  Warning: Warning,
  Error: Error,
  SuccessBackground: SuccessBackground,
  WarningBackground: WarningBackground,
  ErrorBackground: ErrorBackground,
  CloseBtn: CloseBtn,
};
export default Popup;
