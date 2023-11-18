import React from 'react';
import CreateReactClass from 'create-react-class';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Keyboard,
  Alert,
  Dimensions,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  ResetSelectDefaults,
  SelectSingle,
  SelectMulti,
  SelectPopupBtn,
  SelectDataToOptionList,
} from './form/select';
import {
  ResetInputDefaults,
  FormInput,
  InputPopupBtn,
  InputPopupRightBtn,
} from './form/input';
import FormSwitch from './form/switch';
import CheckBox from './form/checkbox';
import Radio from './form/radio';
import * as ImagePicker from 'expo-image-picker';
import canJSON from 'project-can-json';
import unique_id from '../helper/unique_id';
import Popup from '../helper/popup';
import CameraBtn from './form/camera_btn';
import css from '../assets/style';


const ProjectForm = CreateReactClass({
  data: {},
  formData: {},
  onChangeEvents: {},
  onDataReady: [],
  submitName: null,

  Form(props) {

    this.data = {};
    this.formData = {};
    this.onChangeEvents = {};
    this.onDataReady = [];
    this.submitName = null;

    this.setData(props.data);
    if (props.children !== undefined) {
        let headerHeight = props.headerHeight !== undefined ? props.headerHeight : 75;
      let behavior = props.behavior !== undefined && props.behavior ? (typeof props.behavior == 'boolean' ? (Platform.OS === "ios" ? "padding" : "height") : props.behavior) : null;
      return (
        <KeyboardAvoidingView
            behavior={behavior}
            keyboardVerticalOffset={headerHeight}
            style={
              props.style !== undefined
                  ? [{ width: '100%', minWidth: '100%' }, props.style]
                  : { width: '100%', minWidth: '100%' }
            }
        >
          {props.children}
        </KeyboardAvoidingView>
      );
    }
  },

  //set data for form inputs
  setData(data) {
    data = data === undefined ? {} : data;

    //assume that json
    canJSON(
      data,
      (data) => {
        this.data = data;
      },
      (data) => {
        this.data = data;
      }
    );
  },

  setValue(name, value, onChange = false) {
    this.formData[name] = value;
    if (onChange) this._onChange(name, value);
    return value;
  },

  getValue(props, defaultOnUndefined = null) {
    let value =
      this.data[props.name] !== undefined ? this.data[props.name] : null;
    value = props.value !== undefined ? props.value : value;
    return value === undefined ? defaultOnUndefined : value;
  },

  getData() {

    let mergeData = () => {
      let formData = Object.assign(
        Object.create(Object.getPrototypeOf(this.formData)),
        this.formData
      );
      let ret = {};

      const merge = (target, source) => {
        // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
        for (const key of Object.keys(source)) {
          if (source[key] instanceof Object && key in target)
            Object.assign(source[key], merge(target[key], source[key]));
        }

        // Join `target` and modified `source`
        Object.assign(target || {}, source);
        return target;
      };

      const valueToObjectData = (obj, nameParts, i, value) => {
        let name = nameParts[i];
        obj[name.replace(']', '')] =
          nameParts[i + 1] === undefined ? value : {};
        if (nameParts[i + 1] !== undefined) {
          obj[name.replace(']', '')] = valueToObjectData(
            obj[name.replace(']', '')],
            nameParts,
            i + 1,
            value
          );
        }
        return obj;
      };
      const toObjectData = (dRet, name, value) => {
        if (name.indexOf('[') !== -1) {
          let nameParts = name.split('[');
          if (nameParts.length > 1) {
            dRet = valueToObjectData({}, nameParts, 0, value);
          } else {
            dRet[nameParts[0].replace(']', '')] = value;
          }
        } else {
          dRet[name.replace(']', '')] = value;
        }
        //console.log(dRet);
        return dRet;
      };

      if (Object.keys(formData).length) {
        if (Object.keys(formData).join('').indexOf('[') !== -1) {
          Object.keys(formData).forEach((k) => {
            let tmp = toObjectData({}, k, formData[k]);
            ret = merge(ret, tmp);
          });
        } else {
          ret = formData;
        }
      } else {
        ret = formData;
      }
      return ret;
    };

    return new Promise((resolve, reject) => {
      if (this.onDataReady.length) {
        Promise.all(this.onDataReady).then(() => {
          resolve(mergeData());
        });
      } else {
        resolve(mergeData());
      }
    });
  },

  getNumberOfLines(attr) {
    if (attr.numberOfLines) {
      attr.minHeight =
        Platform.OS === 'ios' && attr.numberOfLines
          ? 20 * attr.numberOfLines
          : null;
      attr.numberOfLines = Platform.OS === 'ios' ? null : attr.numberOfLines;
    }
    return attr;
  },

  optionData(options, map) {
    return Object.values(options).map((value) => {
      let assignData = map(value);
      return Object.assign(value, assignData);
    });
  },

  ScrollView(props) {
    if (!props) {
      return null;
    }

    const flatListRef = React.useRef();

    return (
      <FlatList
          ref={props._ref !== undefined ? props._ref : flatListRef}
        ListEmptyComponent={<>{props.children}</>}
        data={null}
        renderItem={null}
      />
    );
  },

  //FORM elements
  Label(props) {
    props.value = props.value === undefined ? '' : props.value;
    let style = props.style !== undefined ? props.style : css.form_label;
    let layerStyle = props.layerStyle === undefined ? {} : props.layerStyle;
    let layer = {
      padding: 5,
      zIndex: 3, // works on ios
      elevation: 3, // works on android
      marginBottom: -13,
      backgroundColor: 'none',
      ...layerStyle,
    };

    return (
      <View style={[css.content, css.content_fit_to_text, layer]}>
        <Text style={style}>{props.value}</Text>
      </View>
    );
  },

  Data(props){

    let value = this.getValue(props);

    return (
        <View style={[css.form_control, props.style]}>
          <Text style={props.styleText !== undefined ? props.styleText : {}}>{value}</Text>
        </View>
    );
  },

  Hidden(props) {
    let onChange = props.onChange;
    return this.Input({ ...props, ...{ type: 'hidden' } }, onChange);
  },

  Text(props) {
    let onChange = props.onChange;
    let popup = props.popup !== undefined ? props.popup : false;
    if (popup) {
      return this.InputPopup({ ...props, ...{ type: 'text' } }, onChange);
    }

    return this.Input({ ...props, ...{ type: 'text' } }, onChange);
  },

  Number(props) {
    let onChange = props.onChange;
    let popup = props.popup !== undefined ? props.popup : false;
    if (popup) {
      return this.InputPopup({ ...props, ...{ type: 'text' } }, onChange);
    }

    return this.Input({ ...props, ...{ type: 'numeric' } }, onChange);
  },

  Password(props) {
    let onChange = props.onChange;
    let popup = props.popup !== undefined ? props.popup : false;
    if (popup) {
      return this.InputPopup({ ...props, ...{ type: 'text' } }, onChange);
    }

    return this.Input({ ...props, ...{ type: 'password' } }, onChange);
  },

  /*
    type
        text
        hidden
        password
        numeric
    keyboardType
        default
        number-pad
        decimal-pad
        numeric
        email-address
        phone-pad
     */

  Input(props) {
    let onChange = props.onChange;
    let value = this.getValue(props);
    this.setValue(props.name, value);
    this.onChangeEvents[props.name] = onChange;
    let style = props.style !== undefined ? props.style : css.form_control;
    let type = props.type !== undefined ? props.type : 'text';
    let attr = props.attr !== undefined ? props.attr : {};
    attr = { ...{ autoCapitalize: 'none', style: {} }, ...attr };

    if (props.name === undefined) {
      Alert.alert('project.from error: input name is undefined');
    }

    if (type === 'hidden') {
      return (
        <View style={css.hidden}>
          <TextInput
            key={unique_id(5)}
            style={css.hidden}
            autoFocus={false}
            multiline={false}
            onFocus={Keyboard.dismiss}
            value={this.setValue(
              props.name,
              value ? value.toString() : value,
              true
            )}
          />
        </View>
      );
    }

    if (type === 'numeric') {
      attr.keyboardType = 'numeric';
    }

    if (type === 'password') {
      return (
        <View style={style}>
          <TextInput
            key={unique_id(5)}
            secureTextEntry={true}
            textContentType="oneTimeCode"
            onChangeText={(val) => {
              this.setValue(props.name, val, true);
            }}
            value={null}
            defaultValue={this.setValue(props.name, null)}
            {...attr}
          />
        </View>
      );
    }

    if (props.readonly !== undefined && props.readonly) {
      return (
        <View style={style} pointerEvents="none">
          <TextInput
            key={unique_id(5)}
            onChangeText={(val) => {
              this.setValue(props.name, val, true);
            }}
            value={null}
            defaultValue={this.setValue(props.name, value)}
            placeholder={props.placeholder}
            editable={false}
            {...attr}
          />
        </View>
      );
    }

    return (
      <View style={style}>
        <TextInput
          key={unique_id(5)}
          onChangeText={(val) => {
            this.setValue(props.name, val, true);
          }}
          value={null}
          defaultValue={this.setValue(props.name, value)}
          placeholder={props.placeholder}
          {...attr}
        />
      </View>
    );
  },

  InputPopup(props) {
    let onChange = props.onChange;
    props.value = this.getValue(props);
    this.setValue(props.name, props.value);
    this.onChangeEvents[props.name] = onChange;
    let width = Dimensions.get('window').width; //full width
    let attr = props.attr !== undefined ? props.attr : {};
    attr = { ...{ autoCapitalize: 'none', numberOfLines: 0 }, ...attr };
    props.numberOfLines = attr.numberOfLines;
    props.type = props.type === undefined ? 'text' : props.type;

    props.popup = (setInputPopupValue) => {
      let popupProps = props;
      popupProps.wrapLines = true;

      let propsStyle = popupProps.style !== undefined ? popupProps.style : {};
      attr.style = { ...propsStyle, ...css.form_control };

      if (props.type === 'text') {
        attr.multiline = true;
        attr.numberOfLines = 5;
        attr.style = {
          ...propsStyle,
          ...css.form_control,
          ...{
            justifyContent: 'flex-start',
            textAlignVertical: 'top',
            color: 'black',
          },
        };
      }

      if (props.type === 'numeric') {
        attr.multiline = false;
        attr.numberOfLines = 1;
        attr.style = {
          ...propsStyle,
          ...css.form_control,
          ...{ color: 'black' },
        };
        attr.keyboardType = 'numeric';
      }

      if (props.type === 'password') {
        this.setValue(props.name, '');
        popupProps.value = '';
        attr.multiline = false;
        attr.numberOfLines = 1;
        attr.style = {
          ...propsStyle,
          ...css.form_control,
          ...{
            justifyContent: 'flex-start',
            textAlignVertical: 'top',
            color: 'black',
          },
        };
        attr.keyboardType = 'default';
        attr.secureTextEntry = true;
        attr.textContentType = 'oneTimeCode';
      }
      attr = this.getNumberOfLines(attr);

      Popup.Alert(
        <View
          style={[
            {
              alignSelf: 'stretch',
              width: width - 100,
              height: 'auto',
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
          ]}
        >
          <View
            style={[
              {
                flex: 3,
              },
            ]}
          >
            <FormInput
              {...popupProps}
              setInputPopupValue={setInputPopupValue}
              attr={attr}
              parent={this}
            />
          </View>
          <View
            style={[
              {
                flex: 1,
                alignItems: 'center',
                marginLeft: 5,
              },
            ]}
          >
            <InputPopupRightBtn
              {...props}
              setInputPopupValue={setInputPopupValue}
            />
          </View>
        </View>
      );
    };

    props.onChange = (value) => {
      this.setValue(props.name, value, true);
    };

    return (
      <>
        <ResetInputDefaults />
        <InputPopupBtn {...props} />
      </>
    );
  },

  TextArea(props) {
    let onChange = props.onChange;
    let value = this.getValue(props);
    this.setValue(props.name, value);
    this.onChangeEvents[props.name] = onChange;
    let style = props.style !== undefined ? props.style : css.form_control;
    let attr = props.attr !== undefined ? props.attr : {};
    attr = { ...{ autoCapitalize: 'none', numberOfLines: 4 }, ...attr };
    attr = this.getNumberOfLines(attr);

    return (
      <View style={style}>
        <TextInput
          key={unique_id(5)}
          multiline={true}
          style={{ justifyContent: 'flex-start', textAlignVertical: 'top' }}
          onChangeText={(val) => {
            this.setValue(props.name, val, true);
          }}
          value={null}
          defaultValue={this.setValue(props.name, value)}
          {...attr}
        />
      </View>
    );
  },

  TextAreaPopup(props) {
    let onChange = props.onChange;
    props.value = this.getValue(props);
    this.setValue(props.name, props.value);
    this.onChangeEvents[props.name] = onChange;
    let attr = props.attr !== undefined ? props.attr : {};
    attr = { ...{ autoCapitalize: 'none' }, ...attr };
    props.numberOfLines = props.lines === undefined ? 4 : props.lines;
    let width = Dimensions.get('window').width; //full width

    props.popup = (setInputPopupValue) => {
      let popupProps = props;
      popupProps.wrapLines = false;

      let propsStyle = popupProps.style !== undefined ? popupProps.style : {};
      attr.style = {
        ...propsStyle,
        ...css.form_control,
        ...{ justifyContent: 'flex-start', textAlignVertical: 'top' },
      };
      attr.multiline = true;
      attr.numberOfLines = 5;
      attr = this.getNumberOfLines(attr);

      Popup.Alert(
        <View
          style={[
            {
              alignSelf: 'stretch',
              width: width - 100,
              height: 'auto',
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
          ]}
        >
          <View
            style={[
              {
                flex: 3,
              },
            ]}
          >
            <FormInput
              {...popupProps}
              setInputPopupValue={setInputPopupValue}
              attr={attr}
              parent={this}
            />
          </View>
          <View
            style={[
              {
                flex: 1,
                alignItems: 'center',
                marginLeft: 5,
              },
            ]}
          >
            <InputPopupRightBtn
              {...props}
              setInputPopupValue={setInputPopupValue}
            />
          </View>
        </View>
      );
    };

    props.onChange = (value) => {
      this.setValue(props.name, value, true);
    };

    return (
      <>
        <ResetInputDefaults />
        <InputPopupBtn {...props} />
      </>
    );
  },

  //props
  //option examples
  //v.1. [[key, value], ...]
  //v.2. [{'key': 1, 'label' : 'first_name last_name'}, ...]
  //v.3. [{'employee_id': 1, 'employee_name' : 'first_name last_name'}, ...]
  Select(props) {
    let options = props.options;
    let onChange = props.onChange;
    let selectedValue = this.getValue(props);
    let style = props.style !== undefined ? props.style : {};
    this.setValue(props.name, selectedValue);
    this.onChangeEvents[props.name] = onChange;

    let selectOp = SelectDataToOptionList(options, selectedValue);
    let optionsList = selectOp.optionsList;

    let onDataChange = (value) => {
      this.setValue(props.name, value, true);
    };

    style =
      Object.keys(style).length > 0
        ? style
        : { height: '100%', margin: 0, padding: 0 };

    let width = Dimensions.get('window').width; //full width
    let popup = ({ setSelectedBtnValue }) => {
      Popup.Alert(
        <View style={[{ alignSelf: 'stretch', width: width - 150 }]}>
          <SelectSingle
            name={props.name}
            style={style}
            items={optionsList}
            selectedValue={selectedValue}
            setSelectedValue={onDataChange}
            setSelectedBtnValue={setSelectedBtnValue}
            useSearch={true}
            selectSubmitButton={props.selectSubmitButton !== undefined ? props.selectSubmitButton : 'Select'}
            closeSubmitButton={props.closeSubmitButton !== undefined ? props.closeSubmitButton : 'Close'}
            searchText={props.searchText !== undefined ? props.searchText : 'Search'}
          />
        </View>
      );
    };

    return (
      <>
        <ResetSelectDefaults />
        <SelectPopupBtn
          popup={popup}
          selectedValue={selectedValue}
          items={optionsList}
          selectText={props.selectText !== undefined ? props.selectText : 'Select item'}
        />
      </>
    );
  },

  SelectMulti(props) {
    let options = props.options;
    let onChange = props.onChange;
    let selectedValue = this.getValue(props);
    selectedValue = Array.isArray(selectedValue)
      ? selectedValue
      : [selectedValue];
    let style = props.style !== undefined ? props.style : {};
    this.setValue(props.name, selectedValue);
    this.onChangeEvents[props.name] = onChange;

    let selectOp = SelectDataToOptionList(options, selectedValue);
    let optionsList = selectOp.optionsList;

    let onDataChange = (value) => {
      this.setValue(props.name, value, true);
    };

    style =
      Object.keys(style).length > 0
        ? style
        : { height: '100%', margin: 0, padding: 0 };

    let width = Dimensions.get('window').width; //full width
    let popup = ({ setSelectedBtnValue }) => {
      Popup.Alert(
        <View style={[{ alignSelf: 'stretch', width: width - 150 }]}>
          <SelectMulti
            name={props.name}
            style={style}
            items={optionsList}
            selectedValue={selectedValue}
            setSelectedValue={onDataChange}
            setSelectedBtnValue={setSelectedBtnValue}
            useSearch={true}
            selectSubmitButton={props.selectSubmitButton !== undefined ? props.selectSubmitButton : 'Select'}
            closeSubmitButton={props.closeSubmitButton !== undefined ? props.closeSubmitButton : 'Close'}
            searchText={props.searchText !== undefined ? props.searchText : 'Search'}
          />
        </View>
      );
    };

    return (
      <>
        <ResetSelectDefaults />
        <SelectPopupBtn
          popup={popup}
          selectedValue={selectedValue}
          items={optionsList}
          selectText={props.selectText !== undefined ? props.selectText : 'Select item'}
        />
      </>
    );
  },

  //SWITCH to center - leave style prop empty
  //SWITCH to left -  float="left"
  //SWITCH value -  value={false/true}
  //SWITCH custom style - style: {}
  Switch(props) {
    let onChange = props.onChange;
    let value = this.getValue(props, false);
    this.setValue(props.name, value);
    this.onChangeEvents[props.name] = onChange;
    let attr = props.attr !== undefined ? props.attr : {};
    let style = props.style === undefined ? {} : props.style;

    let onDataChange = (value) => {
      this.setValue(props.name, value);
      if( props.onChange !== undefined ) props.onChange(value);
    };

    return (
      <FormSwitch
        value={value}
        onChange={onDataChange}
        text={props.text}
        attr={attr}
        style={style}
        float={props.float}
      />
    );
  },


  CheckBox(props){

      let value = this.getValue(props, false);
    this.setValue(props.name, value ? 1 : 0);
    let propsStyle = props.style !== undefined ? props.style : {};
    let style = {
      ...css.form_control,
      ...propsStyle
    };

    let onDataChange = (value) => {

      this.setValue(props.name, value ? 1 : 0);
      if( props.onChange !== undefined ) props.onChange(value ? 1 : 0);
    };

    if(props.text !== undefined){

      return <View style={[{flexDirection: 'row', width: '100%'}, style]}>
      <CheckBox
            style={[css.form_control, {padding: 15}]}
            disabled={props.disabled !== undefined ? props.disabled : false}
            value={value}
            onDataChange={onDataChange}
        />
        <View style={{marginLeft: 10, marginTop: 10}}>
          <Text>{props.text}</Text>
        </View>
      </View>;
    }

    return <View style={[{flexDirection: 'column', width: '100%'}, style]}>
      <CheckBox
          style={[css.form_control, {padding: 15}]}
        disabled={props.disabled !== undefined ? props.disabled: false}
        value={value}
          onDataChange={onDataChange}
      />
    </View>;
  },

  Radio(props){

    let value = this.getValue(props, false);
    this.setValue(props.name, value ? 1 : 0);
    let propsStyle = props.style !== undefined ? props.style : {};
    let style = {
      ...css.form_control,
      ...propsStyle
    };

    let onDataChange = (value) => {

      this.setValue(props.name, value ? 1 : 0);
      if( props.onChange !== undefined ) props.onChange(value ? 1 : 0);
    };

    if(props.text !== undefined){

      return <View style={[css.form_control, {flexDirection: 'row', width: '100%'}, style]}>
        <Radio
            style={{padding: 15}}
            disabled={props.disabled !== undefined ? props.disabled : false}
            name={props.name}
            value={value}
            checked={props.checked !== undefined ? props.checked : false}
            onDataChange={onDataChange}
        />
        <View style={{justifyContent: 'center',marginLeft: 10}}>
          <Text style={{color: props.disabled ? 'grey' : 'black'}}>{props.text}</Text>
        </View>
      </View>;
    }

    return <View style={[{flexDirection: 'column', width: '100%'}, style]}>
      <Radio
          style={[css.form_control, {padding: 15}]}
          disabled={props.disabled !== undefined ? props.disabled: false}
          name={props.name}
          value={value}
          checked={props.checked !== undefined ? props.checked : false}
          onDataChange={onDataChange}
      />
    </View>;
  },

  /*
   <Form.Group>
       <Form.Camera name="camera_images" multiple={true} placeholder={_tr('Take Picture')}/>
       <Form.Gallery name="gallery_images" multiple={true} placeholder={_tr('Select Images')} style={[css.form_control, {marginLeft: 5}]}/>
   </Form.Group>
    */

  Gallery(props) {
    let onChange = props.onChange;
    let onPress = async (setPicture) => {
      setPicture(props.loading !== undefined ? props.loading : 'Loading ...');

      let promiseResolve = null;
      this.onDataReady.push(
        new Promise((resolve, reject) => {
          promiseResolve = resolve;
        })
      );

      let requestPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (requestPermission.granted === false) {
        alert('Permission to access image roll is required!');
        this.onDataReady.pop();
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        base64: true,
      });

      //https://docs.expo.dev/versions/latest/sdk/imagepicker/
      //let xResult = await ImagePicker.getPendingResultAsync();

      if (!result.canceled) {

        if (props.multiple) {
          let value =
            this.formData[props.name] !== undefined &&
            this.formData[props.name] !== null
              ? this.formData[props.name]
              : [];
          let filename = result.assets[0].uri.substring(
            result.assets[0].uri.lastIndexOf('/') + 1,
            result.assets[0].uri.length
          );
          value.push({ fileName: filename, image: result.assets[0].base64 });
          this.setValue(props.name, value, true);
          setPicture(props.loaded !== undefined ? props.loaded.replace(/{length}/gi, value.length) : 'Picture loaded ('+value.length+'pc)');
        } else {
          let filename = result.assets[0].uri.substring(
            result.assets[0].uri.lastIndexOf('/') + 1,
            result.assets[0].uri.length
          );
          this.setValue(
            props.name,
            [{ fileName: filename, image: result.assets[0].base64 }],
            true
          );
          setPicture(props.loaded !== undefined ? props.loaded.replace(/{length}/gi, '1') : 'Picture loaded ('+value.length+'pc)');
        }
        promiseResolve();
      } else {
        this.onDataReady.pop();
        setPicture(props.placeholder);
      }
      return;
    };

    let onDelete = async (elemName, imageName, setPicture) => {

        let value = this.formData[elemName] !== undefined && this.formData[elemName] !== null ? this.formData[elemName] : [];
      if( value.length ){

          let tmp = [];
          let c = value.length;
          for(let i = 0; i < c; i++){

              let row = value[i];
              if( row.fileName != imageName )
                  tmp.push(row);
          }
          this.setValue(elemName, tmp, true);
          tmp = [];

          if( this.formData[elemName].length )
            setPicture(props.loaded !== undefined ? props.loaded.replace(/{length}/gi, this.formData[elemName].length) : 'Picture loaded ('+this.formData[elemName].length+'pc)');
          else
            setPicture(props.placeholder);
      }
    };

    let style = props.style !== undefined ? props.style : css.form_control;
    this.onChangeEvents[props.name] = onChange;

    return (
      <CameraBtn
          {...props}
        style={style}
        onPress={onPress}
        onDelete={onDelete}
        parent={this}
      />
    );
  },

  /*
    <Form.Group>
        <Form.Camera name="camera_images" multiple={true} placeholder={_tr('Take Picture')}/>
        <Form.Gallery name="gallery_images" multiple={true} placeholder={_tr('Select Images')} style={[css.form_control, {marginLeft: 5}]}/>
    </Form.Group>
     */

  Camera(props) {
    let onChange = props.onChange;
    let onPress = async (setPicture) => {
      setPicture(props.loading !== undefined ? props.loading : 'Loading ...');

      let promiseResolve = null;
      this.onDataReady.push(
        new Promise((resolve, reject) => {
          promiseResolve = resolve;
        })
      );

      let requestPermission = await ImagePicker.requestCameraPermissionsAsync();

      if (requestPermission.granted === false) {
        alert('Permission to access image roll is required!');
        this.onDataReady.pop();
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: props.quality === undefined ? 0.4 : props.quality,
        allowsEditing: false,
        base64: true,
      });

      //https://docs.expo.dev/versions/latest/sdk/imagepicker/
      //let xResult = await ImagePicker.getPendingResultAsync();

      if (!result.canceled) {
        let filename = result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf('/') + 1,
          result.assets[0].uri.length
        );

        if (props.multiple) {
          let value =
            this.formData[props.name] !== undefined &&
            this.formData[props.name] !== null
              ? this.formData[props.name]
              : [];
          value.push({ fileName: filename, image: result.assets[0].base64 });
          this.setValue(props.name, value, true);
          setPicture(props.loaded !== undefined ? props.loaded.replace(/{length}/gi, value.length) : 'Picture loaded ('+value.length+'pc)');
        } else {
          this.setValue(
            props.name,
            [{ fileName: filename, image: result.assets[0].base64 }],
            true
          );
          setPicture(props.loaded !== undefined ? props.loaded.replace(/{length}/gi, '1') : 'Picture loaded');
        }
        promiseResolve();
      } else {
        this.onDataReady.pop();
        setPicture(props.placeholder);
      }
      return;
    };

    let onDelete = async (elemName, imageName, setPicture) => {

      let value = this.formData[elemName] !== undefined && this.formData[elemName] !== null ? this.formData[elemName] : [];
      if( value.length ){

        let tmp = [];
        let c = value.length;
        for(let i = 0; i < c; i++){

          let row = value[i];
          if( row.fileName != imageName )
            tmp.push(row);
        }
        this.setValue(elemName, tmp, true);
        tmp = [];

        if( this.formData[elemName].length )
          setPicture(props.loaded !== undefined ? props.loaded.replace(/{length}/gi, this.formData[elemName].length) : 'Picture loaded ('+this.formData[elemName].length+'pc)');
        else
          setPicture(props.placeholder);
      }
    };

    let style = props.style !== undefined ? props.style : css.form_control;
    this.onChangeEvents[props.name] = onChange;

    return (
        <CameraBtn
            {...props}
            style={style}
            onPress={onPress}
            onDelete={onDelete}
            parent={this}
        />
    );
  },

  Button(props) {
    let onPress = props.onPress;
    let style = props.style !== undefined ? props.style : css.btn;
    let btn_txt = props.style_txt !== undefined ? props.style_txt : css.btn_txt;
    let attr = props.attr !== undefined ? props.attr : {};
    if (attr.disabled !== undefined && attr.disabled)
      style = { ...style, ...css.btn_disabled };

    let submitFn = () => {
      if (this.submitName) {
        delete this.formData[this.submitName];
      }
      this.submitName = props.name;
      this.setValue(
        props.name === undefined ? 'undefined' : props.name,
        props.value,
        false
      );
      onPress();
    };

    return (
      <TouchableOpacity
        key={unique_id(5)}
        style={style}
        onPress={submitFn}
        {...attr}
      >
        <Text style={btn_txt}>{props.value}</Text>
      </TouchableOpacity>
    );
  },

  Group(props) {
    return (
      <View style={[css.form_control, { flex: 1, flexDirection: 'row' }]}>
        {props.children}
      </View>
    );
  },

  _onChange(elementName, value) {
    if (this.onChangeEvents[elementName]) {
      let callee = this.onChangeEvents[elementName];
      callee(value);
    }
  },

  render() {
    return null;
  },
});

export default ProjectForm;
