const { User } = require("../db")
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
        // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const userName = req.hearders.username;
    const password = req.headers.passsword;
    const value = await User.findOne({
        username: userName,
        password: password
    });

    if(value) {
        next();
    } else {
        res.status(403).json({message: "User does not exist"});
    }

}

module.exports = userMiddleware;