# CONTROLLER

## Usage

main App.js file
```
import {Project, App, Loader} from 'project-react-mvc';
import IndexController from "./app/controller/index";

export default class MainApp extends Project.React {

    state = {
        'reload' : null
    };

    constructor() {

        super();
        App.export({
            Reload: () => {

                this.setState({'reload' : new Date()});
            },
            User: () => {

                return {'user_name': 'some'};
            }
        });
    }

    render() {
    
        if( this.state.reload ){

            setTimeout(() => {

                this.setState({'reload' : null});

            }, 1);

            return (
                <View style={styles.container}>
                    <Loader/>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <IndexController method="index"/>
                <IndexController method="footer"/>
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

/app/controller/index.js file

```
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Loader, Project, App} from "project-react-mvc";
import {Index, Next} from './app/view/index';

export default class IndexController extends Project.React {

    constructor(props) {

        super(props);
        if (this.props.method === 'index') {

            this.view(
                <Loader/>
            );
        }
    }

    index() {
    
        //exported global function
        let user = App.User();

        this.view(
            <Index data={{'adr': 'see'}}/>
        );
    }

    next() {
    
        //get data async    
        address
        .where('address_id', 6)
        .fetch((row) => {

            //replace view content
            this.view (
                <Next data={row}/>
            );
        });
    }
    
    footer(){
    
        this.view(
            <View>
                <Text>footer</Text>
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


app/view/index.js file

```
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StatusBar} from "expo-status-bar";
//import Another_Controller from './app/controller/another';

export function Index(data) {

    return (
        <>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>ADDRESS: {data.adr}</Text>
            <Button onPress={() => {

                //call controller method inside this controller
                this.next()
                //call controller method outside this controller
                //this.call(<Another_Controller method="index"/>)
            }} title="NEXT"/>
        </>
    );
}

export function Next() {

    return (
        <View style={styles.container}>
            <Text>THIS</Text>
            <Button onPress={() => {

                //call controller method inside this controller
                this.index()
                //call controller method outside this controller
                //this.call(<Another_Controller method="other"/>)
            }} title="BACK"/>
            <StatusBar style="auto"/>
        </View>
    );
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
