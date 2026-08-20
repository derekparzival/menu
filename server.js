const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-feedback', (req, res) => {
    const { message } = req.body;
    
    // Define the path to your feedback folder
    const folderPath = path.join(__dirname, 'feedback');
    
    // Ensure the feedback directory exists
    if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
    }

    // Save each message with a unique timestamped filename
    const fileName = `feedback_${Date.now()}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, `Message:\n${message}`, (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Could not save file.' });
        }
        res.json({ success: true, message: 'Saved to feedback folder!' });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
