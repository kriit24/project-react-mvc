import React, {useState, useRef, createRef} from 'react';
import {TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import unique_id from '../../helper/unique_id';
import Popup from '../../helper/popup';
import css from '../../assets/style';

let globalValue = {};
let globalChangedValue = {};
let globalInputRef = null;

function ResetInputDefaults() {
    globalValue = {};
    return null;
}

function FormInput(props) {
    globalValue[props.name] =
        props.parent.formData[props.name] !== undefined &&
        props.parent.formData[props.name]
            ? props.parent.formData[props.name]
            : '';

    if (globalChangedValue[props.name] === undefined)
        globalChangedValue[props.name] =
            props.value !== undefined && props.value ? props.value : '';

    let selectionLength =
        globalValue[props.name] !== null ? globalValue[props.name].length : 0;

    setTimeout(() => {
        if (globalInputRef && !globalInputRef.isFocused()) {
            globalInputRef.focus();
            globalInputRef.setNativeProps({
                selection: {start: selectionLength, end: selectionLength},
            });
        }
    }, 150);

    return (
        <DblClickInput
            key={unique_id(5)}
            onChangeText={(val) => {
                if (props.wrapLines === undefined || props.wrapLines)
                    val = val.replace('\n', ' ');

                globalChangedValue[props.name] = val;
            }}
            value={null}
            defaultValue={globalValue[props.name]}
            innerRef={(ref) => {
                if (ref) {
                    globalInputRef = Object.assign(ref, {props: props});
                }
            }}
            {...props.attr}
        />
    );
}


let editableTimeout = null;

function DblClickInput(props) {

    const [editable, setEditable] = useState(false);
    const [editableText, setEditableText] = useState(props.defaultValue !== null ? props.defaultValue : "");
    const [selection, setSelection] = useState({'start': 0, 'end': 0});

    return <TextInput
        {...props}
        defaultValue={editableText}
        selection={selection.end > 0 ? selection : null}
        ref={props.innerRef !== undefined ? props.innerRef : null}
        onChangeText={(text) => {

            setSelection({'start': 0, 'end': 0});
            setEditableText(text);
            if( props.onChangeText ) props.onChangeText(text);
        }}
        onPressIn={() => {

            if (editableTimeout) clearTimeout(editableTimeout);

            if (editable) {

                setSelection({'start': 0, 'end': (editableText !== null ? editableText.length : 0)});
                setEditable(false);
            } else {

                setSelection({'start': 0, 'end': 0});
                setEditable(true);
                editableTimeout = setTimeout(() => {

                    setEditable(false);
                }, 200);
            }
        }}
    />;
}

function InputPopupBtn(props) {
    let [inputPopupValue, setInputPopupValue] = useState(
        props.value !== undefined && props.value ? props.value : ''
    );

    if (props.type === 'password' && inputPopupValue.length) {
        let s = '*';
        inputPopupValue = s.repeat(inputPopupValue.length);
    }
    let height =
        props.numberOfLines !== undefined && parseInt(props.numberOfLines)
            ? 15 * props.numberOfLines
            : 'auto';

    return (
        <TouchableOpacity
            key={unique_id(5)}
            style={[css.form_control]}
            onPress={() => {
                props.popup(setInputPopupValue);
            }}
        >
            <Text style={{color: css.form_control.color, height: height}}>
                {inputPopupValue}
            </Text>
        </TouchableOpacity>
    );
}

function InputPopupRightBtn(props) {
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    globalChangedValue[props.name] = globalValue[props.name];
                    globalInputRef = null;
                    Popup.CloseAlert();
                }}
                style={[css.btn, css.btn_danger, style.btn]}
            >
                <Icon name="close" size={40} color="#FFF" style={{}}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    globalValue[props.name] = globalChangedValue[props.name];
                    props.onChange(globalValue[props.name]);
                    if (props.setInputPopupValue !== undefined)
                        props.setInputPopupValue(globalValue[props.name]);
                    globalInputRef = null;
                    Popup.CloseAlert();
                }}
                style={[css.btn, css.btn_success, style.btn]}
            >
                <Icon name="content-save" size={40} color="#FFF" style={{}}/>
            </TouchableOpacity>
        </>
    );
}

const style = StyleSheet.create({
    btn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export {ResetInputDefaults, FormInput, DblClickInput, InputPopupBtn, InputPopupRightBtn};
