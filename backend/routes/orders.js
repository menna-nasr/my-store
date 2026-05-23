const router = require('express').Router();
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

router.post('/checkout', auth, async (req, res) => {
  try {
    const { items, total, userEmail } = req.body;

    const itemsList = items.map(item =>
      `<tr>
        <td style="padding:8px;border-bottom:1px solid #3a2e1c;color:#f5ede0">${item.title}</td>
        <td style="padding:8px;border-bottom:1px solid #3a2e1c;color:#f5ede0">${item.author}</td>
        <td style="padding:8px;border-bottom:1px solid #3a2e1c;color:#d4a853">$${item.price}</td>
      </tr>`
    ).join('');

    await transporter.sendMail({
      from: `"Libreria Store" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: '📚 Order Confirmation — Libreria',
      html: `
        <div style="background:#0f0d0a;padding:2rem;font-family:Georgia,serif;color:#f5ede0;max-width:600px;margin:0 auto">
          <h1 style="color:#d4a853;font-size:2rem;margin-bottom:0.5rem">📚 Libreria</h1>
          <p style="color:#9e8e7e;margin-bottom:2rem">Your order has been confirmed</p>
          <h2 style="color:#f5ede0;font-size:1.2rem;margin-bottom:1rem">Order Summary</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
            <thead>
              <tr style="background:#1a1510">
                <th style="padding:10px;text-align:left;color:#d4a853;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase">Title</th>
                <th style="padding:10px;text-align:left;color:#d4a853;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase">Author</th>
                <th style="padding:10px;text-align:left;color:#d4a853;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase">Price</th>
              </tr>
            </thead>
            <tbody>${itemsList}</tbody>
          </table>
          <div style="border-top:1px solid #3a2e1c;padding-top:1rem;text-align:right">
            <p style="color:#9e8e7e;font-size:0.9rem">Shipping: $3.99</p>
            <p style="color:#d4a853;font-size:1.3rem;font-weight:bold">Total: $${total}</p>
          </div>
          <div style="background:#1a1510;border:1px solid #3a2e1c;padding:1rem;margin-top:1.5rem">
            <p style="color:#9e8e7e;font-size:0.9rem;margin:0">🚚 Estimated delivery: <strong style="color:#d4a853">5 business days</strong></p>
          </div>
          <p style="color:#4a3e2e;font-size:0.8rem;margin-top:2rem;text-align:center">Thank you for shopping with Libreria ✨</p>
        </div>
      `
    });

    res.json({ message: 'Order confirmed and email sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;