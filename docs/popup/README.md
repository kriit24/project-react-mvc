# POPUP

## Usage

main App.js file
```
import {Project, App, Popup} from 'project-react-mvc';

export default class MainApp extends Project.React {

    constructor() {

        super();
        Popup.init({
            confirm: {
                YES: 'YES',
                NO: 'NO',
            }
        });
    }

    render() {
    
        /*
        CALL after Popup Show methods are loaded
        Popup.Alert('content', 'header')
        Popup.CloseAlert(timeout, complete)
        Popup.FullAlert('content')
        Popup.CloseFullAlert(timeout, complete)
        Popup.BottomAlert('content', 'header')
        Popup.CloseBottomAlert(timeout, complete)
        Popup.TopAlert('content')
        Popup.CloseTopAlert(timeout, complete)
        Popup.Modal('content', 'header')
        Popup.CloseModal(timeout, complete)
        Popup.BottomModal('content', 'header')
        Popup.CloseBottomModal(timeout, complete)
        Popup.Loader()
        Popup.CloseLoader(timeout, complete)
        Popup.Confirm('text', resolve, reject, success_btn, fail_btn)
        Popup.CloseConfirm(timeout, complete)
        Popup.Success('content')
        Popup.Warning('content')
        Popup.Error('content')
        Popup.SuccessBackground('content')
        Popup.WarningBackground('content')
        Popup.ErrorBackground('content')
        */

        return (
            <View style={styles.container}>
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
```
