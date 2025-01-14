const testLogin = (req, res) => {
    const { email, password } = req.body;
    const data = {
        'demo_user@innosquares.com': '64Squares@012',
    };

    if (data[email] && data[email] === password) {
        res.json({ message: 'Login Successfull.' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = testLogin;
