import {Project, App, Loader, Popup} from "../../../index";
import {Index} from '../view/index';
import {Index as FooterIndex} from '../view/footer';

export default class ControllerIndex extends Project.React {

    constructor(props) {

        super(props);
        if (this.props.method === 'Index') {

            this.view(
                <Loader/>
            );
        }
    }

    Index(){

        console.log('controller index');

        let data = App.User();
        this.view(
            <Index data={data}/>
        );
    }

    Footer() {

        let user = App.User();
        this.view(
            <FooterIndex user={user}/>
        );
    }

    LogOut() {

        Popup.Loader();
        //logout
        Popup.CloseLoader(0);
        App.Reload();
    }
}
