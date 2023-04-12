module.exports = resolverFun => (req, res, next)=>{
    Promise.resolve(resolverFun(req, res, next)).catch(next);
}