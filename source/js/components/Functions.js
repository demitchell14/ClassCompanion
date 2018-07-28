import $ from 'jquery';

let Functions = {
    load: function(opts) {
        Object.assign(opts, {
        });
        console.log(opts);
        return new Promise((resolve, reject) => {
            $.ajax(opts).done(resolve).fail(reject);
        })
    }
}

export default Functions;