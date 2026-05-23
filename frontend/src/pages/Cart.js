import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCartKey, getCurrentUser } from '../utils/auth';

function Cart() {
  const [cart, setCart] = useState([]);
  const [orderSent, setOrderSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem(getCartKey()) || '[]'));
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(b => b.id !== id);
    setCart(updated);
    localStorage.setItem(getCartKey(), JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = async () => {
    const user = getCurrentUser();
    if (!user) { alert('Please login first!'); return; }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/orders/checkout', {
        items: cart,
        total: (subtotal + shipping).toFixed(2),
        userEmail: 'marwamaryoma2013@gmail.com'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrderSent(true);
      localStorage.removeItem(getCartKey());
      setCart([]);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const subtotal = cart.reduce((sum, b) => sum + b.price, 0);
  const shipping = cart.length > 0 ? 3.99 : 0;
  const total = subtotal + shipping;
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 5);
  const deliveryStr = delivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  if (orderSent) return (
    <div className="cart-page text-center" style={{ paddingTop: '5rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold)', marginBottom: '1rem' }}>
        Order Confirmed!
      </h2>
      <p style={{ color: 'var(--cream-dim)', marginBottom: '2rem' }}>
        A confirmation email has been sent. Your books will arrive by <strong style={{ color: 'var(--gold)' }}>{deliveryStr}</strong>.
      </p>
      <Link to="/" style={{ color: 'var(--gold)' }}>← Continue Shopping</Link>
    </div>
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your <em>Collection</em></h1>
      <div className="divider" style={{ margin: '1rem 0 2rem' }}></div>

      {cart.length === 0 ? (
        <div className="cart-empty text-center py-5">
          <div className="cart-empty-icon">📚</div>
          <p>Your cart is empty.</p>
          <Link to="/" style={{ color: 'var(--gold)', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
            Browse our collection →
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-md-8">
            {cart.map(book => (
              <div className="cart-item" key={book.id}>
                <div className="cart-item-color" style={{ background: book.color }}>{book.title[0]}</div>
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{book.title}</h3>
                  <p className="cart-item-author">by {book.author}</p>
                </div>
                <span className="cart-item-price">${book.price.toFixed(2)}</span>
                <button className="btn-remove" onClick={() => removeItem(book.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="col-12 col-md-4">
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
              <button className="btn-luxury mt-0" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;