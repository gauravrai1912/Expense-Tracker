const { spawn } = require('child_process');
const path = require('path');
const axios = require('axios');

exports.predictExpenses = async (req, res) => {
    try {
        // Get month and year from the query parameters
        const { month, year } = req.query;

        // Check if month and year are provided
        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required' });
        }

        // Fetch the spending trends from the dashboard API
        const response = await axios.get('http://localhost:5000/api/dashboard/trends', {
            headers: {
                Authorization: req.headers.authorization,
            },
        });

        const spendingTrends = response.data;

        // Path to the predict.py file inside the 'aiml' folder
        const scriptPath = path.join(__dirname, '../AIML', 'predict.py');
        const inputData = JSON.stringify(spendingTrends);
        const futureMonth = `${year}-${month}`.trim();  // Trim to avoid any extra whitespace

        // Spawn the Python process
        const pythonProcess = spawn('python3', [scriptPath, inputData, futureMonth]);

        // Collect Python process output
        let pythonOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                return res.status(200).json({ predictedExpenses: pythonOutput });
            } else {
                return res.status(500).json({ error: 'Python script failed' });
            }
        });

    } catch (error) {
        console.error('Error in predicting expenses:', error.message);
        res.status(500).json({ error: 'Failed to predict expenses' });
    }
};

