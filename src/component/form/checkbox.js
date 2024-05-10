import Fontisto from '@expo/vector-icons/Fontisto';
import React from "react";
import {TouchableOpacity, View} from "react-native";

export default function CheckBox(props) {

    const [isChecked, setChecked] = React.useState(props.checked);
    //style,disabled

    if (isChecked) {

        return <TouchableOpacity style={props.style} onPress={() => {

            if (props.disabled === undefined || !props.disabled) {

                props.onDataChange(null);
                setChecked(false);
            }
        }}>
            <Fontisto name="checkbox-active" size={32} color="black" />
            {props.children !== undefined ? props.children : null}
        </TouchableOpacity>;
    }
    return <TouchableOpacity style={props.style} onPress={() => {

        if (props.disabled === undefined || !props.disabled) {

            props.onDataChange(props.value);
            setChecked(true);
        }
    }}>
        <Fontisto name="checkbox-passive" size={32} color="black" style={{paddingRight: props.children !== undefined ? 3 : 0}}/>
        {props.children !== undefined ? props.children : null}
    </TouchableOpacity>;
}
