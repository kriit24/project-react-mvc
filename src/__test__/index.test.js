import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Project, App, Loader, Popup} from "../index";
import renderer from 'react-test-renderer';
import expect from "expect";
import ControllerIndex from './app/controller/index';

export default class MainApp extends Project.React {

    state = {
        'load': true,
        'reload' : null
    };

    constructor() {

        super();
        //let makes async tasks before continue
        //import translates from server
        //get user data from server
        let promise = [];

        promise.push(new Promise(async (resolve, reject) => {
            Popup.init({
                confirm: {
                    YES: 'YES',
                    NO: 'NO',
                }
            });
            resolve('done');
        }));

        Promise.all(promise).then(() => {

            this.setState({'load' : false});
        }).catch((error) => {

            this.setState({'load' : false});
        });

        //set globally App.Reload() AND App.User()
        App.export({
            Reload: () => {

                this.setState({'reload' : new Date()});
            },
            User: () => {

                return {
                    'user_name' : 'some',
                };
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
        if( this.state.load ){

            return (
                <View style={styles.container}>
                    <Loader/>
                </View>
            );
        }

        console.log('render');

        return (
            <View style={styles.container}>
                <ControllerIndex method="Index"/>
                <View>
                    <ControllerIndex method="Footer"/>
                </View>
                <Popup.ShowAlert/>
                <Popup.ShowFullAlert/>
                <Popup.ShowBottomAlert/>
                <Popup.ShowTopAlert/>
                <Popup.ShowModal/>
                <Popup.ShowBottomModal/>
                <Popup.ShowLoader/>
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

test('renders correctly', () => {
    //let tree = Test('see');
    //console.log(tree);
    const tree = renderer.create(<MainApp />).toJSON();
    expect(tree).toMatchSnapshot();
});
