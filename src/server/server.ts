const express = require('express');
const cors = require('cors');
const pool = require('./db').default;

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Route pour récupérer les catégories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE is_active = true');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour récupérer les produits
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE stock_quantity > 0');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour récupérer les produits par catégorie
app.get('/api/products/category/:categoryId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE category_id = ? AND stock_quantity > 0',
      [req.params.categoryId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});