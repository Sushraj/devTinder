const jwt = require('jsonwebtoken');

const secret = 'your-secret-key';

function createToken(payload) {
    return jwt.sign(payload,secret,{expiresIn: '1h'});
}



function authenticateToken(req,res,next) {
    const token = req.headers['authorization'];

    if(token === null) return res.sendStatus(401);

    jwt.verify(token,secret,(err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
    
}

module.exports = {createToken, authenticateToken};