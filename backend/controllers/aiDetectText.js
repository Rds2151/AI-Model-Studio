require("dotenv").config();

const EC2_URL = process.env.EC2_URL || 'localhost';

const aiDetectText = (req, res, next) => {
  const input = req.body.input;

  if (!input) {
    console.error("No input provided in request body");
    return res.status(400).json({ error: "Input is required" });
  }

    console.log('Sending AI Detection check request for input:', input);
    
    fetch(`${EC2_URL}:8080/detect-ai-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
    })
    .then(response => {
        if (!response.ok) {
            console.error('AI Detection check service returned error:', response.status, response.statusText);
            throw new Error(`Service returned ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('AI Detection check successful:', data);
        res.status(200).json({'statusCode':200, 'output' : data.ai_probability});
    })
    .catch(error => {
        console.error('AI Detection check failed:', error.message);
        res.status(500).json({ 
            error: 'Failed to check AI Detection Text',
            details: error.message 
        });
    });
};

module.exports = aiDetectText;
