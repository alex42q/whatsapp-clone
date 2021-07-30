module.exports = (req, res, next)=>{
    if(!req.session.jwt) return res.status(401).send("You are not loggedin!")
    next()
}