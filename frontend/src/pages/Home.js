import React, { useState } from 'react';

const books = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", price: 14.99, genre: "Fiction", color: "#1a3a2e" },
  { id: 2, title: "Atomic Habits", author: "James Clear", price: 16.99, genre: "Self-Help", color: "#3a2a10" },
  { id: 3, title: "Dune", author: "Frank Herbert", price: 13.99, genre: "Sci-Fi", color: "#10223a" },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", price: 12.99, genre: "Philosophy", color: "#3a1030" },
  { id: 5, title: "Educated", author: "Tara Westover", price: 15.99, genre: "Memoir", color: "#1f3a10" },
  { id: 6, title: "Project Hail Mary", author: "Andy Weir", price: 17.99, genre: "Sci-Fi", color: "#0f103a" },
];

function Home() {
  const [added, setAdded] = useState({});

  const addToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find(b => b.id === book.id);
    if (!exists) {
      cart.push(book);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
    setAdded(prev => ({ ...prev, [book.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [book.id]: false })), 2000);
  };

  return (
    <div>
      <div className="home-hero">
        <p className="home-hero-label">Curated Collection</p>
        <h1 className="home-hero-title">
          Stories that<br /><em>move the soul</em>
        </h1>
        <p className="home-hero-sub">
          Handpicked books for the curious mind. Free delivery on all orders.
        </p>
        <div className="divider"></div>
      </div>

      <div className="books-grid">
        {books.map(book => (
          <div className="book-card" key={book.id}>
            <div className="book-spine" style={{ background: book.color }}>
              <span className="book-spine-letter">{book.title[0]}</span>
              <span className="book-genre-tag">{book.genre}</span>
            </div>
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <div className="book-footer">
                <span className="book-price">${book.price}</span>
                <button
                  className={`btn-add-cart${added[book.id] ? ' added' : ''}`}
                  onClick={() => addToCart(book)}
                >
                  {added[book.id] ? '✓ Added' : '+ Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;