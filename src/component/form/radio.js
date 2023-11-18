import { Ionicons } from '@expo/vector-icons';
import React from "react";
import {TouchableOpacity} from "react-native";

let previousSetChecked = {};

export default function Radio(props) {

    const [isChecked, setChecked] = React.useState(props.checked);

    if( props.checked )
        previousSetChecked[props.name] = setChecked;

    //style,disabled

    if( isChecked ) {

        return <TouchableOpacity style={props.style}>
            <Ionicons name="radio-button-on" size={32} color="black"/>
            {props.children !== undefined ? props.children : null}
        </TouchableOpacity>;
    }
    return <TouchableOpacity style={props.style} onPress={() => {

        if( props.disabled === undefined || !props.disabled ) {

            props.onDataChange(true);
            setChecked(true);
            if (previousSetChecked[props.name] !== undefined) previousSetChecked[props.name](false);
            previousSetChecked[props.name] = setChecked;
        }
    }}>
        <Ionicons name="radio-button-off" size={32} color={props.disabled ? 'grey' : 'black'}/>
        {props.children !== undefined ? props.children : null}
    </TouchableOpacity>;
}
