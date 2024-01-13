# CALLBACK

## Usage

```
import {Project} from 'project-react-mvc';

//this callback does not allow overwrite object params and function arguments
Project.Callback(function (row, etc) {

    setTimeout(() => {

        console.log('APP-ARGS');
        console.log(pre(row));
        //console.log(pre(row2));
        console.log(this.seda);
        //console.log(this.init());
        console.log('END');

    }, 5000);

}, this/null, {'see': 1}, {'etc...'});
```
