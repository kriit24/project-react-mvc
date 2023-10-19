import { ProjectReact, ProjectApp } from './component/project.react';
import ProjectForm from './component/project.form';
import ProjectValidate from './component/project.validate';
import Popup from './helper/popup';
import Loader from './helper/loader';
import ProjectPromise from "./component/project.promise";

const Project = {
    React: ProjectReact,
    Form: ProjectForm,
    Validate: ProjectValidate,
    Popup: Popup,
    Promise: ProjectPromise,
};

const App = ProjectApp;
const Form = new ProjectForm();
const Validate = new Project.Validate();
const ScrollView = (props) => {
  return new ProjectForm().ScrollView(props);
};

export { Project, ScrollView, Form, Validate, Popup, Loader, App };
