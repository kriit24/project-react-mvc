import React from 'react';
import { Alert, StatusBar } from 'react-native';

class ProjectReact extends React.Component {
  state = {
    content: null,
  };

  _isMounted = false;
  _willUnmount = false;
  _willUnmountList = [];

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
    this._willUnmount = false;
    if (this.props.method !== undefined) {
      let method = this.props.method;
      let props = this.props;
      if (this[method] === undefined) {
        Alert.alert(
          'Method "' + method + '" not found @ "' + this.constructor.name + '"'
        );
      } else {
        const merge = this.componentProps();
        this[method].apply(this, [{...props, ...merge}]);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._willUnmount = true;
    if (this._willUnmountList.length) {
      const _willUnmountList = this._willUnmountList;
      this._willUnmountList = [];
      _willUnmountList.forEach((callback) => {
        callback();
      });
    }
  }

  component(content) {
    let stateObject = { content: content };
    if (this._willUnmount === false) {
      if (this._isMounted) {
        this.setState(stateObject);
      } else {
        this.state = Object.assign(this.state, stateObject);
      }
    }
  }

  componentProps(){

    return {action: this.action};
  }

  call(content, reject) {
    if (typeof content === 'function') {
      if (this._isMounted && this._willUnmount === false) content();
      else {
        if (reject !== undefined) {
          reject();
        }
      }
    }
    else if (typeof content === 'object' && content.props.method !== undefined) {
      this.component(content);
    }
    else {
      const merge = this.componentProps();
      let params = Object.assign({}, [{...content.props, ...merge}]);
      let fn = content.type;
      fn.apply(null, [params]);
    }
  }

  //NB! view function must be
  /*
    function Index(){
    }

    IF u use, then it will not work
    () => {}
     */
  view(component) {
    let Source = Object.assign({}, component);
    if (typeof Source.type === 'function') {
      Source.type = Source.type.bind(this);
    }
    this.component(Source);
  }

  action(component) {
    //console.log(this.constructor.name);

    let className = component.type;
    let action = new className();
    action.props =
      action.props === undefined
        ? this.props
        : { ...this.props, ...action.props };
    let method =
      component.props.method !== undefined ? component.props.method : 'Index';

    setTimeout(() => {

      const merge = this.componentProps();
      let content = action[method].apply(action, [{...component.props, ...merge}]);
      if (content !== undefined) {
        this.component(content);
      }
    }, 100);
  }

  render() {
    return this.state.content;
  }
}

const ProjectApp = {
  export: function(obj){
    Object.keys(obj).forEach((key) => {
      ProjectApp[key] = obj[key];
    });
  }
}

export { ProjectReact, ProjectApp };
