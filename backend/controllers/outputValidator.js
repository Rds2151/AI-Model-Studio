require('dotenv').config()

const URL = process.env.API_URL || 'localhost'

const outputValidator = (req, res, next) => {
    const input1 = req.body.learner;
    const input2 = req.body.expected;
    
    if (!input1 || !input2) {
        console.error('No input provided in request body');
        return res.status(400).json({ error: 'Input is required' });
    }

    console.log('Sending Output Validator check request for input:', input1);
    
    fetch(`${URL}output-comparison`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'learner': input1, 'expected': input2 })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Output Validator check service returned error:', response.status, response.statusText);
            throw new Error(`Service returned ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Output Validator check successful:', data);
        res.status(200).json(data);
    })
    .catch(error => {
        console.error('Output Validator check failed:', error.message);
        res.status(500).json({ 
            error: 'Failed to check grammar',
            details: error.message 
        });
    });
};

module.exports = outputValidator;