import React, {useState} from 'react';
import {
    Pressable,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import Popup from '../../helper/popup';

let selectedValue = null;
let timeOutId = null;

const SaveBtn = ({selectSubmitButton, setSelectedValue}) => {
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
                {selectSubmitButton !== undefined ? selectSubmitButton : 'Submit'}
            </Text>
        </TouchableOpacity>
    );
};

const CloseBtn = ({selectSubmitButton, setSelectedValue}) => {
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
                {selectSubmitButton !== undefined ? selectSubmitButton : 'Close'}
            </Text>
        </TouchableOpacity>
    );
};

const SearchInput = ({items, setItems, useSearch, searchText}) => {
    if (!useSearch) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchValue, setSearchValue] = useState(null);

    return (
        <View style={styles.form_control}>
            <TextInput
                onChangeText={(currentSearchValue) => {
                    if (timeOutId) clearTimeout(timeOutId);

                    if (currentSearchValue.length >= 1) {
                        timeOutId = setTimeout(() => {
                            let result = [];

                            let keys = Object.keys(items);
                            for (let i = 0; i < keys.length; i++) {

                                let arrayKey = keys[i];
                                let rows = items[arrayKey];

                                result[arrayKey] = [];

                                if( arrayKey.toLowerCase() === currentSearchValue.toLowerCase() ){

                                    result[arrayKey] = rows;
                                }
                                else {

                                    rows.forEach((value, key) => {
                                        let labelValue = value.label.toLowerCase();

                                        if (labelValue.indexOf(currentSearchValue.toLowerCase()) !== -1)
                                            result[arrayKey].push(value);
                                    });
                                }
                            }

                            setSearchValue(currentSearchValue);
                            setItems(result);
                        }, 250);
                    } else {
                        setSearchValue('');
                        setItems(items);
                    }
                }}
                value={null}
                defaultValue={searchValue}
                placeholder={searchText}
                editable={true}
                autoCapitalize={'none'}
            />
        </View>
    );
};

const SelectGroupSingleElem = (props) => {
    const [items, setItems] = useState(props.items);
    const [selectedId, setSelectedId] = useState(props.selectedValue);
    selectedValue = selectedId;

    const foreachItems = (item) => {

        let groupName = item.item;

        if (items[groupName] !== undefined && items[groupName].length) {

            return <>
                <Text style={styles.group_item}>{groupName}</Text>
                {items[groupName].map(renderItem)}
            </>;
        }
        return null;
    };

    const renderItem = (item) => {

        let selectedElem = Array.isArray(selectedId) ? selectedId : [selectedId];

        const backgroundColor =
            selectedElem.indexOf(item.value) !== -1 ? 'lightgrey' : 'white';
        const color = selectedElem.indexOf(item.value) !== -1 ? 'white' : 'black';

        let onPress = () => {
            if (selectedElem.indexOf(item.value) === -1) {
                setSelectedId(item.value);
            }
        };

        return (
            <Pressable
                onPress={onPress}
                style={[styles.item_container, {backgroundColor}]}
                key={props.name + item.value}
            >
                <Text style={[styles.item, {color: color}]}>{item.label}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <SearchInput
                items={props.items}
                setItems={setItems}
                useSearch={props.useSearch}
                searchText={props.searchText}
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
                    data={Object.keys(items)}
                    renderItem={foreachItems}
                    estimatedItemSize={100}
                    keyExtractor={(item) => item}
                    extraData={selectedId}
                />
            </View>
            <View
                style={{
                    paddingTop: 5,
                }}
            >
                <SaveBtn
                    selectSubmitButton={props.selectSubmitButton}
                    setSelectedValue={props.setSelectedValue}
                />
            </View>
            <View
                style={{
                    paddingTop: 5,
                }}
            >
                <CloseBtn
                    selectSubmitButton={props.closeSubmitButton}
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
        paddingLeft: 10
    },
    group_item: {
        backgroundColor: 'white',
        color: '#6c757d',
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 5
    },
    item_container: {
        backgroundColor: 'white',
        padding: 5,
        paddingLeft: 25,
        marginVertical: 2,
        marginHorizontal: 2,
    },
    item: {
        fontSize: 20,
        color:'#212529',
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

export default SelectGroupSingleElem;
