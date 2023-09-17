# CONTROLLER

## Usage

main App.js file
```
import {Project, App} from 'project-react-mvc';
import App_controller from "./App_controller";

export default class MApp extends Project.React {

    constructor() {

        super();
        App.export({
            User: () => {

                return 'some'
            }
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <App_controller method="index"/>
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

App_controller.js file

```
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Loader, Project, App} from "project-react-mvc";
import {Index, Next} from './App_view';

export default class App_controller extends Project.React {

    constructor() {

        super();
        this.view(
            <Loader/>
        );
    }

    index() {
    
        //exported global function
        let user = App.User();

        this.view(
            <Index data={{'adr': 'see'}}/>
        );
    }

    next() {
    
        address
        .where('address_id', 6)
        .fetch((row) => {

            this.view (
                <Next data={row}/>
            );
        });
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


App_view.js file

```
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StatusBar} from "expo-status-bar";
//import App_Another_Controller from './App_controller_2';

//MENU
export function Index(data) {

    return (
        <>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>ADDRESS: {data.adr}</Text>
            <Button onPress={() => {

                //if u return to the same controller
                let App_controller = require('./App_controller').default;
                this.call(
                    <App_controller method="next"/>
                )
            }} title="NEXT"/>
        </>
    );
}

export function Next() {

    return (
        <View style={styles.container}>
            <Text>THIS</Text>
            <Button onPress={() => {

                //if u return to the same controller
                let App_controller = require('./App_controller').default;
                this.call(
                    <App_controller method="index"/>
                )
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
