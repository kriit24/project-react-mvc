import Checkbox from 'expo-checkbox';
import React from "react";

export default function CheckBox(props) {

    const [isChecked, setChecked] = React.useState(props.value ? true : false);

    return <Checkbox
        style={props.style}
        disabled={props.disabled}
        value={isChecked}
        onValueChange={(newValue) => {

            props.onDataChange(newValue ? true : false);
            setChecked(newValue);
        }
        }
    />;
}
