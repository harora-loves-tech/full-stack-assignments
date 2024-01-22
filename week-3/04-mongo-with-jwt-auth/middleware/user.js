function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if(decoded.username) {
        next();
    } else {
        res.status(403).json({message: "Invalid Token"});
    }

}

module.exports = userMiddleware;