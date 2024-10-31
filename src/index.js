import { ProjectReact, ProjectApp } from './component/project.react';
import ProjectForm from './component/project.form';
import ProjectValidate from './component/project.validate';
import Popup from './helper/popup';
import Loader from './helper/loader';
import ProjectPromise from "./component/project.promise";
import ProjectCallback from "./component/project.callback";

const Project = {
    React: ProjectReact,
    Form: ProjectForm,
    Validate: ProjectValidate,
    Popup: Popup,
    Promise: ProjectPromise,
    Callback: ProjectCallback,
};

const App = ProjectApp;
const Form = new ProjectForm();
const Validate = new Project.Validate();
const Callback = Project.Callback;
/*
let scrollRef = React.useRef();
<ScrollView _ref={scrollRef}>

    <TouchableOpacity onPress={(state) => {

        scrollRef.current.scrollToOffset({ animated: true, offset: 0 });
    }}>
        <Text>{title}</Text>
    </TouchableOpacity>
</ScrollView>
 */
const ScrollView = (props) => {
    return new ProjectForm().ScrollView(props);
};

function Bind(props) {

    let component = props.children;
    let Source = Object.assign({}, component);
    if (typeof Source.type === 'function') {
        Source.type = Source.type.bind(props.bind);
    }
    return Source;
}

function Action(component){

    return (new ProjectReact(this)).action(component);
}


export { Project, ScrollView, Form, Validate, Popup, Loader, App, Bind, Callback, Action };
