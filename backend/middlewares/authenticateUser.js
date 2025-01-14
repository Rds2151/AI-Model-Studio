const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.redirect('login')
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    // Here you would typically verify the token (e.g., using JWT)
    // For example:
    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({ message: 'Token is not valid.' });
    //     }
    //     req.user = decoded; // Save the decoded user info to the request
    //     next(); // Proceed to the next middleware or route handler
    // });

    // For demonstration, let's assume the token is valid
    req.user = { id: 1, name: 'Demo User' }; // Mock user data
    next();
};

module.exports = authenticateUser;
