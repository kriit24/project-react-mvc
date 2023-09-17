# POPUP

## Usage

main App.js file
```
import {Project, App, Form} from 'project-react-mvc';
import Confirm from "../action/confirm";
import AddRow from "../action/addrow";

export default class MApp extends Project.React {

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
                    
                    //Hidden, Text, Number, Password is shorter for <Form.Input type="">
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
                    
                    //create row list
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
                                        Popup.TopAlert(Popup.SuccessBackground('Data upload success')));
                                        Popup.CloseTopAlert(2000, () => {
                                        
                                            App.reload();
                                        });
                                    }}
                                    fail={(message, error, request) => {
    
                                        Popup.CloseLoader(0);
                                        Popup.TopAlert(Popup.ErrorBackground('Data upload failed')));
                                        Popup.CloseTopAlert(2000, () => {
                                            
                                            App.reload();
                                        });
                                    }}
                                />
                            );
                        }
                        catch (error) {
                          
                            Popup.CloseLoader(0);
                            Popup.TopAlert(Popup.ErrorBackground(error)));
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

                                    App.reload();
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

action/confirm.js

```
import React from 'react';

export default class onfirm {

    Index(props) {

        (async () => {

            //post data to server
        })();
    }
}
```


action/addrow.js

```
import React from 'react';

export default class YardAddRow {

    Index(props) {

        (async () => {
        
            //post data to server props.data
            //use props.success when post succeed
            //use props.fail when post failed
        })();
    }
}

```
