const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebase'); // Assuming you have Firebase setup
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve the products page
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

// Fetch products from Firebase
app.get('/api/products', (req, res) => {
  const productsRef = db.ref('products');
  
  productsRef.once('value', (snapshot) => {
      const products = snapshot.val();
      if (products) {
          res.json(products);
      } else {
          res.json({});
      }
  });
});

// Add a new product
app.post('/api/add-product', (req, res) => {
    const productsRef = db.ref('products');
    const newProductRef = productsRef.push();
    
    newProductRef.set({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    }, (error) => {
        if (error) {
            res.status(500).send('Error adding product');
        } else {
            res.status(200).send('Product added successfully');
        }
    });
});

// Update a product
app.post('/api/update-product', (req, res) => {
    const productId = req.body.id;
    const productRef = db.ref(`products/${productId}`);
    
    productRef.update({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    }, (error) => {
        if (error) {
            res.status(500).send('Error updating product');
        } else {
            res.status(200).send('Product updated successfully');
        }
    });
});

// Delete a product
app.post('/api/delete-product', (req, res) => {
  const productId = req.body.id;
  const productRef = db.ref(`products/${productId}`);
  
  productRef.remove((error) => {
      if (error) {
          res.status(500).json({ status: 'error', message: 'Error deleting product' });
      } else {
          res.status(200).json({ status: 'success' });
      }
  });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
