
export default class ProjectPromise {

    promises = [];

    push(callback) {

        this.promises.push(new Promise((resolve, reject) => {
            callback(resolve, reject);
        }));
    }

    init(success, reject) {

        Promise.all(this.promises).then(() => {

            success.apply(this, arguments !== undefined ? arguments : [] );
        }).catch((error) => {

            if( reject !== undefined )
                reject(error);
        });
    }
}
