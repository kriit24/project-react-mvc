import React, { useEffect, useState } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Popup from '../../helper/popup';
import css from '../../assets/style';

let selectedValue = [];
let timeOutId = null;

const SaveBtn = ({ submitButtonText, setSelectedValue }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedValue(selectedValue);
        Popup.CloseAlert();
      }}
      style={[
        {
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#337ab7',
        },
        {},
      ]}
    >
      <Text
        style={[
          {
            color: '#FFF',
            fontSize: 14,
          },
          {},
        ]}
      >
        {submitButtonText !== undefined ? submitButtonText : 'Submit'}
      </Text>
    </TouchableOpacity>
  );
};

const CloseBtn = ({ submitButtonText, setSelectedValue }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                //setSelectedValue(selectedValue);
                Popup.CloseAlert();
            }}
            style={[
                {
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#b81640',
                },
                {},
            ]}
        >
            <Text
                style={[
                    {
                        color: '#FFF',
                        fontSize: 14,
                    },
                    {},
                ]}
            >
                {submitButtonText !== undefined ? submitButtonText : 'Close'}
            </Text>
        </TouchableOpacity>
    );
};

const SearchInput = ({ items, setItems, useSearch }) => {
  if (!useSearch) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchValue, setSearchValue] = useState(null);

  return (
    <View style={styles.form_control}>
      <TextInput
        onChangeText={(val) => {
          if (timeOutId) clearTimeout(timeOutId);

          if (val.length >= 1) {
            timeOutId = setTimeout(() => {
              let result = [];
              items.forEach((value, key) => {
                let labelValue = value.label.toLowerCase();

                if (labelValue.indexOf(val.toLowerCase()) !== -1)
                  result.push(value);
              });

              setSearchValue(val);
              setItems(result);
            }, 250);
          } else {
            setSearchValue('');
            setItems(items);
          }
        }}
        value={null}
        defaultValue={searchValue}
        placeholder={'Search'}
        editable={true}
        autoCapitalize={'none'}
      />
    </View>
  );
};

const SelectMultiElem = (props) => {
  let origItems = Object.assign([], props.items);
  const [items, setItems] = useState(origItems);
  const [selectedId, setSelectedId] = useState(props.selectedValue);
  selectedValue = selectedId;

  const renderItem = ({ item }) => {
    let selectedElem = selectedId;

    const backgroundColor =
      selectedElem.indexOf(item.value) !== -1 ? 'lightgrey' : 'white';
    const color = selectedElem.indexOf(item.value) !== -1 ? 'white' : 'black';

    let onPress = () => {
      if (selectedElem.indexOf(item.value) === -1) {
        setSelectedId([...selectedId, item.value]);
      } else {
        setSelectedId(selectedId.filter((a) => a !== item.value));
      }
    };

    return (
      <Pressable
        onPress={onPress}
        style={[styles.item, { backgroundColor }]}
        key={props.name + item.value}
      >
        <Text style={[styles.title, { color: color }]}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <SearchInput
        items={origItems}
        setItems={setItems}
        useSearch={props.useSearch}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <FlashList
          data={items}
          renderItem={renderItem}
          estimatedItemSize={15}
          initialNumToRender={15}
          keyExtractor={(item) => item.value}
          extraData={selectedId}
        />
      </View>
        <View
            style={{
                paddingTop: 5,
            }}
        >
            <SaveBtn
                submitButtonText={props.selectSubmitButton}
                setSelectedValue={props.setSelectedValue}
            />
        </View>
        <View
            style={{
                paddingTop: 5,
            }}
        >
            <CloseBtn
                submitButtonText={props.closeSubmitButton}
                setSelectedValue={props.setSelectedValue}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginTop: 0,
    height: '100%',
    paddingBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 20,
  },
  form_control: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ced4da',
    color: 'grey',
    direction: 'ltr',
  },
});

export default SelectMultiElem;
