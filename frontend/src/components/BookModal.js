import React, { useState, useEffect } from 'react';
import { getCurrentUser, getCartKey } from '../utils/auth';

function BookModal({ book, onClose, onCartUpdate }) {
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const saved = localStorage.getItem(`rating_${user.id}_${book.id}`);
      if (saved) setUserRating(parseInt(saved));
    }
    const cart = JSON.parse(localStorage.getItem(getCartKey()) || '[]');
    setAdded(cart.some(b => b.id === book.id));
  }, [book.id]);

  const handleRate = (rating) => {
    const user = getCurrentUser();
    if (!user) { alert('Please login to rate books!'); return; }
    setUserRating(rating);
    localStorage.setItem(`rating_${user.id}_${book.id}`, rating);
  };

  const handleAdd = () => {
    const cartKey = getCartKey();
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    if (!cart.some(b => b.id === book.id)) {
      cart.push(book);
      localStorage.setItem(cartKey, JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      if (onCartUpdate) onCartUpdate();
    }
    setAdded(true);
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', backdropFilter: 'blur(4px)'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        maxWidth: '500px', width: '100%', padding: '2.5rem',
        position: 'relative', animation: 'fadeUp 0.3s ease'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'transparent', border: 'none',
          color: 'var(--cream-dim)', fontSize: '1.2rem', cursor: 'pointer'
        }}>✕</button>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '80px', height: '110px', background: book.color, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Playfair Display, serif', fontSize: '2rem',
            color: 'rgba(255,255,255,0.3)', fontStyle: 'italic'
          }}>{book.title[0]}</div>
          <div>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>{book.genre}</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--cream)', marginTop: '0.3rem', fontSize: '1.4rem' }}>{book.title}</h2>
            <p style={{ color: 'var(--cream-dim)', fontStyle: 'italic', fontSize: '0.95rem' }}>by {book.author}</p>
          </div>
        </div>

        <p style={{ color: 'var(--cream-dim)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          {book.description}
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: '0.5rem' }}>
            Your Rating
          </p>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {[1,2,3,4,5].map(star => (
              <span key={star}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                style={{
                  fontSize: '2rem', cursor: 'pointer', transition: 'color 0.2s',
                  color: star <= (hover || userRating) ? '#d4a853' : '#3a2e1c'
                }}>★</span>
            ))}
          </div>
          {userRating > 0 && (
            <p style={{ color: 'var(--gold)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              You rated this {userRating}/5 ⭐
            </p>
          )}
          {!getCurrentUser() && (
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.8rem', marginTop: '0.4rem' }}>
              Login to rate this book
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--gold)' }}>
            ${book.price}
          </span>
          <button onClick={handleAdd} className={`btn-add-cart${added ? ' added' : ''}`}
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
            {added ? '✓ In Cart' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookModal;