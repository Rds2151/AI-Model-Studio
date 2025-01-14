const { spawn } = require("child_process");
const path = require("path");

// Function to interact with the Python script
const analyzeImageWithPython = (imagePath, userContext) => {
    return new Promise((resolve, reject) => {
        // Start the Python process
        const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3'); 
        const pythonProcess = spawn(pythonPath, ["python-image/image_analysis.py", imagePath, userContext]);

        let data = "";
        let errorData = "";

        // Collect data from the Python process
        pythonProcess.stdout.on("data", (chunk) => {
            console.log(chunk.toString());
            
            data += chunk.toString();
        });

        pythonProcess.stderr.on("data", (chunk) => {
            console.log(chunk.toString());
            
            errorData += chunk.toString();
        });

        // When the process finishes, resolve the result or handle errors
        pythonProcess.on("close", (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (e) {
                    reject("Error parsing Python response.");
                }
            } else {
                reject(errorData || "Unknown error during Python execution.");
            }
        });
    });
}

module.exports = analyzeImageWithPython;