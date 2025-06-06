import React, { useEffect, useState } from "react";
import Navbar from './navbar.jsx';
import './App.css';

const API_BASE_URL = 'https://libraryy-rrp1.onrender.com';

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("book");
  const [reviews, setReviews] = useState({});
  const [newReview, setNewReview] = useState({});

  useEffect(() => {
    fetch(`https://gutendex.com/books?search=${encodeURIComponent(searchTerm)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setBooks(data.results.slice(0, 10));
        }
      });
  }, [searchTerm]);
  useEffect(() => {
  fetch(`${API_BASE_URL}/reviews`)
    .then((res) => res.json())
    .then((data) => setReviews(data));
}, []);///.......................
  

  const handleInputChange = (e) => setQuery(e.target.value);
  const handleSearch = () => {
    if (query.trim()) setSearchTerm(query);
  };

  const handleReviewChange = (bookId, text) => {
    setNewReview({ ...newReview, [bookId]: text });
  };

  const handleReviewSubmit = (bookId) => {
    fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, review: newReview[bookId] })
    })
    .then((res) => res.json())
    .then((data) => {
      setReviews({ ...reviews, [bookId]: data.review });
      setNewReview({ ...newReview, [bookId]: '' });//if changed in future
    });
  };

  const getTextUrl = (book) => {
    const formats = book.formats;
    return formats["text/html"] || formats["text/plain"] || null;
  };
   return (
    
  <div >
    <Navbar />
    <div className="container">
      <h1>Browse Books</h1>

    <input
      type="text"
      className="search-input"
      value={query}
      onChange={handleInputChange}
      placeholder="Search books..."
    />
    <button  class="search-button" onClick={handleSearch}>Search</button>

    {books.length === 0 && <h2>Loading books...</h2>}
    {books.length > 0 && <h1><strong>Top 10 Search Results</strong></h1>}

    <div>
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <h2>{book.title}</h2>
          <p><strong>Author(s):</strong> {book.authors.map((a) => a.name).join(", ")}</p>
          {book.formats["image/jpeg"] && (
            <img src={book.formats["image/jpeg"]} alt={book.title} className="imgg"  />
          )}
          {getTextUrl(book) && (
            <a href={getTextUrl(book)} target="_blank"  className="read-link"rel="noopener noreferrer">
               Read
            </a>
          )}

          <div >
            <h4 className="review-heading">Review</h4>
            <textarea className="review-textarea"
              value={newReview[book.id] || ''}
              onChange={(e) => handleReviewChange(book.id, e.target.value)}
              placeholder="Write your review here..."
            ></textarea>
            <button className="submit-button" onClick={() => handleReviewSubmit(book.id)}>Submit Review</button>
            {reviews[book.id] && <p className="saved-review"><strong>Saved Review:</strong> {reviews[book.id]}</p>}
          </div>
        </div>
      ))}
    </div>
    </div>
    
    
  </div>
);
}

export default App;
