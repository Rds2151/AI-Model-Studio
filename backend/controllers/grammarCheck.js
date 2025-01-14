require('dotenv').config()

const URL = process.env.EC2_URL || 'localhost'

const grammarCheck = (req, res, next) => {
    const input = req.body.input;
    
    if (!input) {
        console.error('No input provided in request body');
        return res.status(400).json({ error: 'Input is required' });
    }

    console.log('Sending grammar check request for input:', input);
    
    fetch(`http://${URL}:8080/grammar-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Grammar check service returned error:', response.status, response.statusText);
            throw new Error(`Service returned ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Grammar check successful:', data);
        res.status(200).json({'statusCode':200, 'output' : data.corrected_text});
    })
    .catch(error => {
        console.error('Grammar check failed:', error.message);
        res.status(500).json({ 
            error: 'Failed to check grammar',
            details: error.message 
        });
    });
};

module.exports = grammarCheck;