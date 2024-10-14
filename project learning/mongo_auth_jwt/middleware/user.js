const jwt = require("jsonwebtoken");
const { secret } = require("../auth");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const word=token.split(" ");
    const jwtTOken=word[1];
    const decoded = jwt.verify(jwtTOken,secret); 
    console.log(decoded);
    if(decoded.username){
        req.username=decoded.username;
        next();
    }
    else{
        res.status(403).json({
            msg:"you are not authenticated"
        })
    }
}


module.exports = userMiddleware;