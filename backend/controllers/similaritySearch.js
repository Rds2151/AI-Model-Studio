require('dotenv').config()

const URL = process.env.API_URL || 'localhost'

const similaritySearch = (req, res, next) => {
    const input = req.body.input;
    
    if (!input) {
        console.error('No input provided in request body');
        return res.status(400).json({ error: 'Input is required' });
    }

    console.log('Sending Similarity Search check request for input:', input);
    
    fetch(`${URL}similarity-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'task_id': input })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Similarity Search check service returned error:', response.status, response.statusText);
            throw new Error(`Service returned ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Similarity Search check successful:', data);
        res.status(200).json(data);
    })
    .catch(error => {
        console.error('Similarity Search check failed:', error.message);
        res.status(500).json({ 
            error: 'Failed to check Similarity Search',
            details: error.message 
        });
    });
};

module.exports = similaritySearch;