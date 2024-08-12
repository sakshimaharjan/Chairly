const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebase');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
  });
  

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin_panel.html'));
});

// Fetch products from Firebase
app.get('/products', (req, res) => {
    const productsRef = db.ref('products');
    productsRef.once('value', (snapshot) => {
      res.json(snapshot.val());
    });
  });
  
  // Add a product
  app.post('/add-product', (req, res) => {
    const productsRef = db.ref('products');
    const newProductRef = productsRef.push();
    newProductRef.set({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
    res.redirect('/');
  });
  
  // Delete a product
  app.post('/delete-product', (req, res) => {
    const productId = req.body.id;
    const productRef = db.ref(`products/${productId}`);
    productRef.remove();
    res.redirect('/');
  });
  
  // Update a product
  app.post('/update-product', (req, res) => {
    const productId = req.body.id;
    const productRef = db.ref(`products/${productId}`);
    productRef.update({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
    res.redirect('/');
  });

const PORT = 3000;
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
