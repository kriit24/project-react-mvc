export default class ProjectPromise {

    promises = [];
    values = [];

    push(callback) {

        this.promises.push(
            function (callback) {

                return new Promise((resolve, reject) => {

                    callback.apply({}, [resolve, reject, ...this.values]);
                });
            }.bind(this, callback)
        );
    }

    init(success, reject) {

        if (this.promises.length) {

            let promise = this.promises.shift();
            promise().then((res) => {

                this.values.push(res);
                this.init(success, reject);
            }).catch((error) => {

                this.promises = [];
                this.values = [];
                if (reject !== undefined)
                    reject(error);
                if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
                    throw error
            });
        }
        else{

            success.apply(this, this.values);
            this.values = [];
            this.promises = [];
        }
    }
}
