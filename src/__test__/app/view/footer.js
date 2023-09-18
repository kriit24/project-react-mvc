import {React} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export function Index({user}) {

    console.log('footer');

    if( user === undefined || !Object.keys(user).length){

        return null;
    }

    let user_name = user.user_name;

    return (
        <View>
            <View style={[{minWidth: '50%', height: '100%', alignItems: 'flex-start', flexDirection: 'row'}]}>
                <View style={[{
                    height: '100%',
                    justifyContent: 'center',
                    padding: 0,
                    margin: 0,
                    marginLeft: 10,
                }]}>
                    <Text style={[{
                        fontSize: 16,
                    }]}>Project React MVC @2023</Text>
                </View>
            </View>
            <View style={[{minWidth: '50%', height: '100%', alignItems: 'flex-end', flexDirection: 'row'}]}>
                <View style={[{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: '100%',
                    paddingRight: 10
                }]}>
                    <Text style={[{
                        fontSize: 16,
                    }]}>{user_name}</Text>
                </View>
                <TouchableOpacity
                    style={[{
                        height: '100%',
                        justifyContent: 'center',
                        padding: 0,
                        margin: 0,
                        marginRight: 10,
                    }]}
                    onPress={() => {

                        this.LogOut();
                    }}>
                    <FontAwesome name="sign-out" style={{
                        fontSize: 26,
                        padding: 0,
                        margin: 0,
                    }}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
