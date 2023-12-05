import {Ionicons} from '@expo/vector-icons';
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
            <Ionicons name="checkbox" size={32} color="black"/>
            {props.children !== undefined ? props.children : null}
        </TouchableOpacity>;
    }
    return <TouchableOpacity style={props.style} onPress={() => {

        if (props.disabled === undefined || !props.disabled) {

            props.onDataChange(props.value);
            setChecked(true);
        }
    }}>
        <Ionicons name="checkbox-outline" size={32} color={props.disabled ? 'grey' : 'black'}/>
        <View style={{width: 20, height: 20, backgroundColor: 'white', marginTop: 20.5, marginLeft: 19.5, position: 'absolute'}}/>
        {props.children !== undefined ? props.children : null}
    </TouchableOpacity>;
}
