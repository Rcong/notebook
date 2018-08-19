module.exports = async (ctx, next) => {
    if (ctx.session.user) {
        await next();
    } else {
        throw 'not login';
    }
}