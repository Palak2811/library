const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');//helps toconnect to frontend
//Sending all the content to the frontend as json
const app = express();
app.use(cors());
app.use(express.json());

const REVIEWS_FILE = path.join(__dirname, 'reviews.txt');

// Helper: Read reviews from file
function readReviews() {
  if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, '{}'); // Create empty file if  reviews.txt not exist
    return {};
  }

  const content = fs.readFileSync(REVIEWS_FILE, 'utf-8');//reads in utf-8 string
  try {
    return JSON.parse(content);//make the string a javascript object
  } catch (err) {
    console.error('Error parsing reviews file:', err);
    return {};
  }
}

// Helper: Write reviews to file
function writeReviews(reviews) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews), 'utf-8');
}

// GET /reviews - return all reviews
app.get('/reviews', (req, res) => {
  const reviews = readReviews();
  res.json(reviews);//converts it back to jason format
});

// POST /reviews - save a review
app.post('/reviews', (req, res) => {
  const { bookId, review } = req.body;// Extract bookId and review from request body

  if (!bookId || !review) {
    return res.status(400).json({ error: 'Missing bookId or review' });
  }

  const reviews = readReviews();
  reviews[bookId] = review;//seeting up like the array of reviwes and the key value is bookid= the value that is review
  writeReviews(reviews);

  res.json({ review });//res is the response sent to the website
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
