var jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header("Authorization") && req.header("Authorization").replace("Bearer ", "");

    // let's verify the token 

    if (!token) {
        return res.status(403).send({
            status: 403,
            message: "No Token Found",
            success: false
        })
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.TOEKN_SECRET);

        if (verifiedToken) {
            res.user = verifiedToken;
            next();
        } else {
            return res.send({
                status: 403,
                message: "Invalid Token",
                success: false
            })
        } 

    } catch (error) {
        res.send({ error: error.message })
    }

}

export default auth;