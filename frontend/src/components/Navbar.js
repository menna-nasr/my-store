import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    update();
    window.addEventListener('cartUpdated', update);
    return () => window.removeEventListener('cartUpdated', update);
  }, []);

  return (
    <nav className="navbar-custom">
      <Link to="/" className="nav-brand">📚 Libreria</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li>
          <Link to="/cart">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;