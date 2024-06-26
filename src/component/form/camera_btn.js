import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import unique_id from "project-react-mvc/src/helper/unique_id";
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import css from "project-react-mvc/src/assets/style";

function CameraImages(props) {

    if (props.thmb) {

        if (props.images !== undefined && props.images.length) {

            let c = props.images.length;
            let ret = [];

            for (let i = 0; i < c; i++) {

                let retImg = CameraImages({...props, ...{images: props.images[i]}});
                ret.push(retImg[0]);
            }
            return ret;
        }

        if (props.images !== undefined && Object.keys(props.images).length) {

            let img = props.images;
            let img_type = 'png';
            if (img.fileName.indexOf('jpg') !== -1) {

                img_type = 'jpg';
            }
            if (img.fileName.indexOf('jpeg') !== -1) {

                img_type = 'jpg';
            }
            if (img.fileName.indexOf('gif') !== -1) {

                img_type = 'gif';
            }

            let source = {
                uri: 'data:image/' + img_type + ';base64,' + img.image
            };
            return [
                <View key={'image_thmb_' + unique_id()} style={{paddingTop: 18}}>
                    <Image source={source} style={styles.tinyLogo}/>
                    <TouchableOpacity
                        style={{alignSelf: 'flex-end', top: -132, right: -2, marginTop: -45}}
                        onPress={() => {
                            props.onDelete(props.name, img.fileName, props.setPicture);
                        }}
                    >
                        <AntDesign name="closecircleo" size={38} color="#b81640"/>
                    </TouchableOpacity>
                </View>
            ];
        }
    }

    return [];
}

export default function CameraBtn(props) {

    const [picture, setPicture] = useState(props.placeholder);
    let imageList = CameraImages({...props, ...{images: props.parent.formData[props.name], setPicture: setPicture}});

    return (
        <View style={{flex: (props.icon ? 0 : 1), flexDirection: 'column', flexWrap: 'nowrap'}}>
            <TouchableOpacity
                style={props.style}
                onPress={() => {
                    props.onPress(setPicture);
                }}
            >
                {props.icon ?
                    <View style={[css.btn, {paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}, (picture !== undefined ? css.btn_success : {})]}>
                        <FontAwesome name={props.iconType} size={24} color="white"/>
                    </View>
                    :
                    <Text style={props.style_btn}>{picture !== undefined ? picture : props.label}</Text>
                }
            </TouchableOpacity>
            {imageList.length ? <View style={styles.imageContainer}>{imageList}</View> : null}
        </View>
    );
}

const styles = {
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        //alignContent: 'space-around',
        flexWrap: 'wrap'
    },
    tinyLogo: {
        width: 150,
        height: 150,
        resizeMode: 'center',
        margin: 5,
    },
};
