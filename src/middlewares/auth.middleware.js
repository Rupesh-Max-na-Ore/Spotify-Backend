const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== 'artist'){
            return res.status(403).json({message: 'You are not authorized to perform this action. Consider signing up as an artist.'});
        }

        // create new property in req object and assign decoded token to it, so that it can be used in other controllers
        req.user = decoded; 

        next();

    } catch (error) {
         console.log(error);
         return res.status(401).json({ message: 'Invalid token/Unauthorized' });
    }
}

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== 'user' && decoded.role !== 'artist'){
            return res.status(403).json({message: 'You are not authorized t perform this action. Consider signing up as a user.'});
        }

        // create new property in req object and assign decoded token to it, so that it can be used in other controllers
        req.user = decoded; 

        next();

    } catch (error) {
         console.log(error);
         return res.status(401).json({ message: 'Invalid token/Unauthorized' });
    }
}

module.exports = { authArtist, authUser };