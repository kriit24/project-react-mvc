# FORM

## Usage

main App.js file
```
import {Project, Popup, Loader, App, Form, Validate} from 'project-react-mvc';
import Confirm from "./app/action/confirm";
import AddRow from "./app/action/addrow";

export default class MainApp extends Project.React {

    state = {
        'reload': null,
    }

    constructor() {

        super();
        App.export({
            Reload: () => {

                this.setState({'reload' : new Date()});
            }
        });
    }

    render() {
    
        let json_data = {
            'articleId': 1,
            'quantity': 15,
            'description': 'description',
        };
    
        if( this.state.reload ){

            setTimeout(() => {

                this.setState({'reload' : null});
            }, 1);

            return (
                <View style={[css.body]}>
                    <Loader/>
                </View>
            );
        }
    
        return (
            <View style={styles.container}>
                <Form.Form style={[css.content]} data={json_data}>
                    <Form.Label value={'label_article'}/>
                    
                    {/*Hidden, Text, Number, Password is shorter for */}
                    <Form.Input type="">
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
                    
                    {/*regular data label*/}
                    <View style={[css.form_control]}>
                        <Text>{json_data.descirption}</Text>
                    </View>
                    
                    <Form.Select
                    name="articleId"
                    selectText={_tr('Select ...')}
                    searchText={_tr('Search ...')}
                    selectSubmitButton={_tr('Select')}
                    closeSubmitButton={_tr('Close')}
                    options={articles}/>
                    
                    <Form.SelectMulti
                    name="articleId"
                    selectText={_tr('Select ...')}
                    searchText={_tr('Search ...')}
                    selectSubmitButton={_tr('Select')}
                    closeSubmitButton={_tr('Close')}
                    options={articles}/>
                    
                    {/*create row list*/}
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
                                if( data['documentId'] === null ) return false;
                                return true;
                            }, 'message');
    
                            this.action(
                                <AddRow
                                    data={data}
                                    success={(data, request) => {
    
                                        Popup.CloseLoader(0);
                                        Popup.TopAlert(Popup.SuccessBackground('Data upload success'));
                                        Popup.CloseTopAlert(2000, () => {
                                        
                                            App.Reload();
                                        });
                                    }}
                                    fail={(message, error, request) => {
    
                                        Popup.CloseLoader(0);
                                        Popup.TopAlert(Popup.ErrorBackground('Data upload failed'));
                                        Popup.CloseTopAlert(2000, () => {
                                            
                                            App.Reload();
                                        });
                                    }}
                                />
                            );
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
                    style={[css.btn, css.btn_success]}
                    onPress={async () => {

                        Popup.Loader();

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
                    }}/>
                </Form.Form>
            </View>
        );
    }
    
    MultiFormInSinglePage(){
    
        let MultiForm = new Project.Form();

        return (
            <View key={client.client_id} style={style.accordion}>
                <MultiForm.Form data={client}>
                    <MultiForm.Hidden name="client_id"/>
    
                    <View style={{flexDirection: 'column'}}>
                        <MultiForm.Label value={'TELEFON'}/>
                        <MultiForm.Number name="client_phone"/>
                    </View>
    
                    <View style={{flexDirection: 'column'}}>
                        <MultiForm.Label value={'EMAIL'}/>
                        <MultiForm.Text name="client_email"/>
                    </View>
    
                    <View style={{flexDirection: 'column'}}>
                        <MultiForm.Label value={'SÜNNIPÄEVA TEAVITUS EMAIL'}/>
                        <MultiForm.Switch name="client_is_birthday_recipient_email" float="left" value={!!coalesce(client.client_is_birthday_recipient_email)}/>
                    </View>
    
                    <View style={{flexDirection: 'column'}}>
                        <MultiForm.Label value={'SÜNNIPÄEVA TEAVITUS SMS'}/>
                        <MultiForm.Switch name="client_is_birthday_recipient_sms" float="left" value={!!coalesce(client.client_is_birthday_recipient_sms)}/>
                    </View>
    
                    <MultiForm.Button
                        name="SaveClientContact"
                        value={_tr('Salvesta')}
                        onPress={async (data_1) => {
    
                            Popup.Loader();
                            let data = await MultiForm.getData();
                        }}
                    />
                </MultiForm.Form>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
```

app/action/confirm.js

```
import React from 'react';

export default class Confirm {

    Index(props) {

        (async () => {

            //post data to server
        })();
    }
}
```


app/action/addrow.js

```
import React from 'react';

export default class AddRow {

    Index(props) {

        (async () => {
        
            //post data to server props.data
            //use props.success when post succeed
            //use props.fail when post failed
        })();
    }
}

```
