let resSuc = function( data = 'success' ) {
    this.body = {
        status: 200,
        data
    }
}

let resFail = function( msg = 'fail' ) {
    if (msg instanceof Object && msg.status && msg.msg) {
        this.body = msg;
    } else {
        this.body = {
            status: 500,
            msg
        }
    }
}


module.exports = async (ctx, next) => {
    Object.assign(ctx, {
        resFail, resSuc
    });
    await next();
}
