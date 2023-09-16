import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SelectSingleElem from './select_single';
import SelectMultiElem from './select_multi';
import unique_id from '../../helper/unique_id';
import css from '../../assets/style';

let defaultValues = {};

function ResetSelectDefaults() {
  defaultValues = {};
  return null;
}

function SelectSingle(props) {
  if (defaultValues[props.name] === undefined)
    defaultValues[props.name] = props.selectedValue;

  const [selectedValue, setSelectedValue] = useState(defaultValues[props.name]);
  let items = popupSelected(props.items, selectedValue);

  defaultValues[props.name] = selectedValue;

  return (
    <View style={{ ...css.form_control, paddingBottom: 0 }}>
      <SelectSingleElem
        name={props.name}
        items={items}
        selectedValue={selectedValue}
        useSearch={props.useSearch}
        setSelectedValue={(selected) => {
          props.setSelectedValue(selected);
          props.setSelectedBtnValue(selected);
          setSelectedValue(selected);
        }}
      />
    </View>
  );
}

function SelectMulti(props) {
  if (defaultValues[props.name] === undefined)
    defaultValues[props.name] = props.selectedValue;

  const [selectedValue, setSelectedValue] = useState(defaultValues[props.name]);
  let items = popupSelected(props.items, selectedValue);

  defaultValues[props.name] = selectedValue;

  return (
    <View style={{ ...css.form_control, paddingBottom: 0 }}>
      <SelectMultiElem
        name={props.name}
        items={items}
        selectedValue={selectedValue}
        useSearch={props.useSearch}
        setSelectedValue={(selected) => {
          props.setSelectedValue(selected);
          props.setSelectedBtnValue(selected);
          setSelectedValue(selected);
        }}
      />
    </View>
  );
}

function SelectPopupBtn(props) {
  const [selectedBtnValue, setSelectedBtnValue] = React.useState(
    props.selectedValue
  );
  let selectLabel = SelectedLabel(props.items, selectedBtnValue)
    ? SelectedLabel(props.items, selectedBtnValue)[0]
    : 'Select item';

  return (
    <TouchableOpacity
      key={unique_id(5)}
      style={[css.form_control]}
      onPress={() => {
        props.popup({ setSelectedBtnValue: setSelectedBtnValue });
      }}
    >
      <Text style={{ color: 'lightgrey' }}>{selectLabel}</Text>
    </TouchableOpacity>
  );
}

function popupSelected(options, selectedValue) {
  let selected = Array.isArray(selectedValue) ? selectedValue : [selectedValue];
  let list = [];
  options.forEach((v, k) => {
    if (selected.indexOf(v.value) !== -1) {
      list.push(v);
    }
  });
  options.forEach((v, k) => {
    if (selected.indexOf(v.value) === -1) {
      list.push(v);
    }
  });

  return list;
}

function SelectDataToOptionList(data, selectedValue) {
  let selected = Array.isArray(selectedValue) ? selectedValue : [selectedValue];
  let initValue = '';
  let arrayList = data;
  if (data.length === undefined && Object.keys(data).length > 0) {
    const objectArray = Object.entries(data);
    let tmp = [];

    objectArray.forEach(([key, value]) => {
      tmp.push({ key, value });
    });
    arrayList = tmp;
  }

  const optionsList = arrayList.map((value, key) => {
    let item_label = null;
    let item_value = null;

    if (Object.keys(value).length > 0) {
      if (value.value !== undefined) item_value = value.value;
      else {
        let values = Object.values(value);
        item_value = values[0];
      }

      if (value.label !== undefined) item_label = value.label;
      else {
        let values = Object.values(value);
        item_label = values[1];
      }
    } else {
      item_label = value;
      item_value = key;
    }

    if (selected.indexOf(item_value) !== -1)
      initValue += (initValue.length > 0 ? ', ' : '') + item_label;

    return { value: item_value, label: item_label };
  });

  return { initValue: initValue, optionsList: optionsList };
}

function SelectedLabel(items, selectedValue) {
  if (!items.length) return null;

  if (!selectedValue) return null;

  let ret = [];
  let selected = Array.isArray(selectedValue) ? selectedValue : [selectedValue];
  items.forEach((item, index) => {
    if (selected.indexOf(item.value) !== -1) {
      ret.push(item.label);
    }
  });
  return ret.length ? ret : null;
}

export {
  ResetSelectDefaults,
  SelectSingle,
  SelectMulti,
  SelectPopupBtn,
  SelectDataToOptionList,
};
