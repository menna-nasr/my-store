import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(b => b.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cart.reduce((sum, b) => sum + b.price, 0);
  const shipping = cart.length > 0 ? 3.99 : 0;
  const total = subtotal + shipping;

  const today = new Date();
  const delivery = new Date(today);
  delivery.setDate(today.getDate() + 5);
  const deliveryStr = delivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your <em>Collection</em></h1>
      <div className="divider" style={{ margin: '1rem 0 2rem' }}></div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">📚</div>
          <p>Your cart is empty.</p>
          <Link to="/" style={{ color: 'var(--gold)', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
            Browse our collection →
          </Link>
        </div>
      ) : (
        <>
          {cart.map(book => (
            <div className="cart-item" key={book.id}>
              <div className="cart-item-color" style={{ background: book.color }}>
                {book.title[0]}
              </div>
              <div className="cart-item-info">
                <h3 className="cart-item-title">{book.title}</h3>
                <p className="cart-item-author">by {book.author}</p>
              </div>
              <span className="cart-item-price">${book.price.toFixed(2)}</span>
              <button className="btn-remove" onClick={() => removeItem(book.id)} title="Remove">✕</button>
            </div>
          ))}

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal ({cart.length} {cart.length === 1 ? 'book' : 'books'})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="delivery-info">
              🚚 Estimated delivery by <strong>&nbsp;{deliveryStr}</strong>
            </div>

            <button className="btn-luxury" style={{ marginTop: 0 }}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;