# PROMISE

## Usage

```
import {Project} from 'project-react-mvc';

let promise = new Project.Promise();

promise.push((resolve, reject) => {
    client_company
        .select()
        .where('client_company_id', props.route.params.client_company_id)
        .fetch(resolve);
});


promise.push((resolve, reject, args, client_company) => {
    order
        .select()
        .where('order_client_company_id', client_company.client_company_id)
        .limit(1)
        .fetch(resolve);
}, {'add additional args'});

promise.init((client_company, order) => {

    this.view(
        <ClientView {...props} client_company={client_company} order={order}/>
    );
});
```
