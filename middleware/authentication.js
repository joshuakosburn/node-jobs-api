const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

// We pass this as middleware to check the token
// that the client provides us with for
// authenticity.
const auth = async (req, res, next) => {
    // Get authorization header
    const authHeader = req.headers.authorization;

    // Check if authHeader exists or check if the authHeader
    // value starts with 'Bearer '.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid!');
    }

    // The authHeader will come is as 'Bearer ${tokenValue}.
    // We want to split those up so we just get the ${tokenValue}.
    // We use the space between them as the delimeter and get the 
    // token at the index of 1.
    const token = authHeader.split(' ')[1];

    try {
        // Get the payload by verifying the token.
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the routes
        req.user = { userID: payload.userID, name: payload.name };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid!');
    }
}

module.exports = auth;