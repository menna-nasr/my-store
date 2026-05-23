import React, { useState } from 'react';
import BookModal from '../components/BookModal';
import { getCartKey } from '../utils/auth';

const books = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", price: 14.99, genre: "Fiction", color: "#1a3a2e", rating: 4.5, description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to undo her regrets and live her best possible life." },
  { id: 2, title: "Atomic Habits", author: "James Clear", price: 16.99, genre: "Self-Help", color: "#3a2a10", rating: 4.8, description: "A proven framework for improving every day. Learn how tiny changes in behaviour can lead to remarkable results in your life and work." },
  { id: 3, title: "Dune", author: "Frank Herbert", price: 13.99, genre: "Sci-Fi", color: "#10223a", rating: 4.7, description: "Set in the distant future, Dune tells the story of Paul Atreides and his family's dangerous journey to the most important planet in the universe — Arrakis." },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", price: 12.99, genre: "Philosophy", color: "#3a1030", rating: 4.6, description: "A magical story about following your dreams. Santiago, an Andalusian shepherd, travels from Spain to Egypt in search of treasure and discovers the world's greatest treasure along the way." },
  { id: 5, title: "Educated", author: "Tara Westover", price: 15.99, genre: "Memoir", color: "#1f3a10", rating: 4.4, description: "A memoir about a young girl who grows up in a survivalist family in Idaho and eventually earns a PhD from Cambridge University, all while keeping her family's secrets." },
  { id: 6, title: "Project Hail Mary", author: "Andy Weir", price: 17.99, genre: "Sci-Fi", color: "#0f103a", rating: 4.9, description: "A lone astronaut must save the earth from disaster in this propulsive, gripping adventure by the author of The Martian. He doesn't even remember his name." },
  { id: 7, title: "The Psychology of Money", author: "Morgan Housel", price: 15.49, genre: "Finance", color: "#2a1a3a", rating: 4.7, description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know — it's about how you behave." },
  { id: 8, title: "Sapiens", author: "Yuval Noah Harari", price: 14.49, genre: "History", color: "#3a1a1a", rating: 4.6, description: "A brief history of humankind. How did Homo sapiens come to dominate the planet? This sweeping narrative of our evolution challenges everything we thought we knew about being human." },
  { id: 9, title: "The Power of Now", author: "Eckhart Tolle", price: 13.49, genre: "Self-Help", color: "#1a3a3a", rating: 4.3, description: "A guide to spiritual enlightenment. Tolle shows that the key to spiritual enlightenment is learning to live in the present moment." },
  { id: 10, title: "1984", author: "George Orwell", price: 11.99, genre: "Fiction", color: "#2a2a1a", rating: 4.8, description: "A dystopian social science fiction novel set in Airstrip One, a province of the superstate Oceania, in a world of perpetual war, omnipresent government surveillance." },
  { id: 11, title: "Think and Grow Rich", author: "Napoleon Hill", price: 12.49, genre: "Finance", color: "#3a2a2a", rating: 4.5, description: "The landmark bestseller now revised and updated for the 21st century. This book has been called the Granddaddy of All Motivational Literature." },
  { id: 12, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, genre: "Classic", color: "#1a2a3a", rating: 4.2, description: "Set in the summer of 1922, the story follows Nick Carraway as he observes the lavish lifestyle of his neighbor Jay Gatsby and his obsession with Daisy Buchanan." },
];

const genres = ['All', ...new Set(books.map(b => b.genre))];

const Stars = ({ rating }) => (
  <span style={{ color: '#d4a853', fontSize: '0.85rem' }}>
    {'★'.repeat(Math.floor(rating))}
    {rating % 1 >= 0.5 ? '½' : ''}
    <span style={{ color: '#3a2e1c', fontSize: '0.75rem' }}> ({rating})</span>
  </span>
);

function Home() {
  const [added, setAdded] = useState({});
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);

  const addToCart = (book) => {
    const cartKey = getCartKey();
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    if (!cart.some(b => b.id === book.id)) {
      cart.push(book);
      localStorage.setItem(cartKey, JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
    setAdded(prev => ({ ...prev, [book.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [book.id]: false })), 2000);
  };

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = activeGenre === 'All' || b.genre === activeGenre;
    return matchSearch && matchGenre;
  });

  return (
    <div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onCartUpdate={() => setAdded(prev => ({ ...prev, [selectedBook.id]: true }))}
        />
      )}

      <div className="home-hero">
        <p className="home-hero-label">Curated Collection</p>
        <h1 className="home-hero-title">Stories that<br /><em>move the soul</em></h1>
        <p className="home-hero-sub">Handpicked books for the curious mind. Free delivery on all orders.</p>
        <div className="divider"></div>
      </div>

      <div className="container pb-5">
        <div className="row mb-4">
          <div className="col-12 col-md-6 mx-auto">
            <input type="text" className="form-input-luxury w-100"
              placeholder="🔍  Search by title or author..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {genres.map(genre => (
            <button key={genre} onClick={() => setActiveGenre(genre)} style={{
              background: activeGenre === genre ? 'var(--gold)' : 'transparent',
              color: activeGenre === genre ? 'var(--bg)' : 'var(--cream-dim)',
              border: '1px solid', borderColor: activeGenre === genre ? 'var(--gold)' : 'var(--border)',
              padding: '0.3rem 1rem', fontSize: '0.8rem', letterSpacing: '1px',
              cursor: 'pointer', transition: 'all 0.3s', fontFamily: 'Lora, serif',
            }}>{genre}</button>
          ))}
        </div>

        <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          {filtered.length} {filtered.length === 1 ? 'book' : 'books'} found
        </p>

        <div className="row g-4">
          {filtered.length === 0 ? (
            <div className="col-12 text-center py-5" style={{ color: 'var(--cream-dim)' }}>
              <p style={{ fontSize: '2rem' }}>📚</p>
              <p>No books found. Try a different search.</p>
            </div>
          ) : (
            filtered.map(book => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={book.id}>
                <div className="book-card h-100" onClick={() => setSelectedBook(book)}>
                  <div className="book-spine" style={{ background: book.color }}>
                    <span className="book-spine-letter">{book.title[0]}</span>
                    <span className="book-genre-tag">{book.genre}</span>
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <Stars rating={book.rating} />
                    <div className="book-footer mt-2">
                      <span className="book-price">${book.price}</span>
                      <button className={`btn-add-cart${added[book.id] ? ' added' : ''}`}
                        onClick={e => { e.stopPropagation(); addToCart(book); }}>
                        {added[book.id] ? '✓ Added' : '+ Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;