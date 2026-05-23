#  Libreria — Online Bookstore

A full-stack web application for browsing and purchasing books online.

## Tech Stack

- **Frontend:** React.js, Bootstrap, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Testing:** Mocha, Chai, Supertest
- **Version Control:** Git & GitHub

## Pages

| Page | Description |
|------|-------------|
| Home | Browse all available books |
| Login | User authentication |
| Register | Create a new account |
| Cart | View selected books & order summary |

## Getting Started

### Prerequisites
- Node.js v22+
- npm

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/menna-nasr/my-store.git
cd my-store
```

**2. Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TEST_MONGO_URI=your_test_mongodb_connection_string
```

```bash
node server.js
```

**3. Setup Frontend**
```bash
cd frontend
npm install
npm start
```

##  Branches

| Branch | Description |
|--------|-------------|
| `main` | Production-ready code |
| `feature/authorization` | JWT middleware for protected endpoints |
| `feature/testing` | Mocha API tests |
| `feature/bootstrap` | Bootstrap responsive grid |

##  Running Tests

```bash
cd backend
npm test
```

##  Authorization

Protected endpoints require a valid JWT token in the `Authorization` header:
| Endpoint | Method | Auth Required |
|----------|--------|---------------|
| /api/auth/register | POST | ❌ |
| /api/auth/login | POST | ❌ |
| /api/products | GET | ❌ |
| /api/products | POST | ✅ |
| /api/products/:id | DELETE | ✅ |

##  Developer

| Name | Role |
|------|------|
| Menna Nasr | Full Stack Developer |