import React from 'react';
import {Text, View} from "react-native";
import {Form, Popup, Validate} from "../../../index";

export function Index({data}) {

    console.log('view index', data);

    let id = data.id === undefined ? null : data.id;
    let articles = {};


    return (
        <View>
            <Text>{data.user_name}</Text>

            <Form.Form style={{}} data={data}>
                <Form.Label value={'label'}/>

                <Form.Hidden name="documentId" value={id}/>
                <Form.Text name="quantity"/>
                <Form.Number name="quantity"/>
                <Form.Password name="quantity"/>
                <Form.Switch name="quantity_type" float="left" value={true}/>

                <Form.Input name="quantity"/>
                <Form.InputPopup name="quantity"/>

                <Form.TextArea name="description"/>
                <Form.TextAreaPopup name="description"/>

                <Form.Camera name="images" multiple={true}/>
                <Form.Gallery name="images" multiple={true}/>

                <Form.Select name="articleId" submitButtonText={'Select ...'} options={articles}/>
                <Form.SelectMulti name="articleId" submitButtonText={'Select ...'} options={articles}/>

                <Form.Group>
                    <Form.Input name="quantity"/>
                    <Form.InputPopup name="quantity"/>
                </Form.Group>

                <Form.Button
                    name="AddRow"
                    value={'btn_save'}
                    onPress={async () => {

                        Popup.Loader();
                        let data = await Form.getData();

                        try{

                            Validate.data(data);

                            Validate.required('documentId', 'message');
                            Validate.is_number('documentId', 'message');
                            Validate.is_email('documentId', 'message');
                            Validate.is_equal('documentId', 'documentId_2', 'message');
                            Validate.in_array('documentId', [5], 'message');
                            Validate.custom((data) => {
                                return data['documentId'] !== null;

                            }, 'message');

                            /*
                            this.action(
                                <AddRow
                                    data={data}
                                    success={(data, request) => {

                                        Popup.CloseLoader(0);
                                        Popup.TopAlert(Popup.SuccessBackground('Data upload success'));
                                        Popup.CloseTopAlert(2000, () => {

                                            App.reload();
                                        });
                                    }}
                                    fail={(message, error, request) => {

                                        Popup.CloseLoader(0);
                                        Popup.TopAlert(Popup.ErrorBackground('Data upload failed'));
                                        Popup.CloseTopAlert(2000, () => {

                                            App.reload();
                                        });
                                    }}
                                />
                            );
                            */
                        }
                        catch (error) {

                            Popup.CloseLoader(0);
                            Popup.TopAlert(Popup.ErrorBackground(error));
                            Popup.CloseTopAlert(5000);
                        }
                    }}/>


                <Form.Button
                    name="reject"
                    value={'Cancel'}
                    onPress={async () => {

                        Popup.Loader();

                        /*
                        this.action(
                            <Confirm
                                data={{id: json_data.id, status: 'STATUS_CONFIRMED'}}
                                success={(data, request) => {

                                    App.Reload();
                                }}
                                fail={(message, error, request) => {

                                    App.Reload();
                                }}
                            />
                        );
                        */
                    }}/>
            </Form.Form>
        </View>
    );
}
