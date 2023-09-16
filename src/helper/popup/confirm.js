import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Alert, CloseAlert } from './alert';
import css from '../../assets/style';

export function Confirm(
  text,
  resolve = null,
  reject = null,
  success_btn = null,
  fail_btn = null
) {
  if (!success_btn) success_btn = css.btn_success;

  if (!fail_btn) {
    fail_btn = css.btn_success;
    fail_btn = {
      fail_btn,
      ...{ marginLeft: 15, borderColor: 'black', backgroundColor: 'white' },
    };
  }

  Alert(
    <View style={{ alignItems: 'center', padding: 25 }}>
      <View>
        {typeof text === 'string' ? (
          <Text style={{ color: 'black', fontSize: 20 }}>{text}</Text>
        ) : (
          text
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: 'auto',
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={[
            css.btn,
            success_btn,
            {
              //flex: 1,
              alignItems: 'center',
              width: 'auto',
              height: 'auto',
            },
          ]}
          onPress={() => {
            CloseAlert();
            if (resolve) resolve();
          }}
        >
          <Text style={{ fontSize: 30, textAlign: 'center', color: 'white' }}>
            {this.config.confirm.YES}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            css.btn,
            fail_btn,
            {
              //flex: 1,
              alignItems: 'center',
              width: 'auto',
              height: 'auto',
            },
          ]}
          onPress={() => {
            CloseAlert();
            if (reject) reject();
          }}
        >
          <Text style={{ fontSize: 30, textAlign: 'center', color: 'black' }}>
            {this.config.confirm.NO}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function CloseConfirm() {
  CloseAlert();
}
