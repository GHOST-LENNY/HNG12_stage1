const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { classifyNumber } = require("./utils");

const app = express();
const PORT = process.env.PORT || 7777;

// // Enable CORS for all routes
app.use(cors());
// app.use(express.json());

// Endpoint
app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;
    const isInteger = (value) => /^-?\d+$/.test(value);
    
    if (!number || !isInteger(number)) {
        return res.status(400).json({
            number: number || 'alphabet',
            error: true
        });
    }

    const num = parseInt(number, 10);

  try {
    // Fetch fun fact from Numbers API
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    const funFact = response.data;

    // Classify the number
    const classify = classifyNumber(num);

    // Return the response
    res.status(200).json({
      number: num,
      is_prime: classify.isPrime,
      is_perfect: classify.isPerfect,
      properties: classify.properties,
      digit_sum: classify.digitSum,
      fun_fact: funFact,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fun fact" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});