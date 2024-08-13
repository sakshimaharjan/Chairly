const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./firebase-config.js');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});  

// Admin Panel Routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

// Fetch users
app.get('/admin/users', (req, res) => {
  database.ref('users').once('value', (snapshot) => {
      res.json(snapshot.val());
  });
});

// Delete user
app.delete('/admin/users/:id', (req, res) => {
  const userId = req.params.id;
  database.ref('users/' + userId).remove();
  res.sendStatus(200);
});

// CRUD operations for products
app.get('/admin/products', (req, res) => {
  database.ref('products').once('value', (snapshot) => {
      res.json(snapshot.val());
  });
});

app.post('/admin/products', (req, res) => {
  const newProduct = database.ref('products').push();
  newProduct.set(req.body);
  res.sendStatus(200);
});

app.put('/admin/products/:id', (req, res) => {
  const productId = req.params.id;
  database.ref('products/' + productId).update(req.body);
  res.sendStatus(200);
});

app.delete('/admin/products/:id', (req, res) => {
  const productId = req.params.id;
  database.ref('products/' + productId).remove();
  res.sendStatus(200);
});

// Serve the frontend products page
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin_panel.html'));
// });

// app.get('/products', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'products.html'));
//   });

// // Fetch products from Firebase
// app.get('/products', (req, res) => {
//     const productsRef = db.ref('products');
//     productsRef.once('value', (snapshot) => {
//       res.json(snapshot.val());
//     });
//   });
  
//   // Add a product
//   app.post('/add-product', (req, res) => {
//     const productsRef = db.ref('products');
//     const newProductRef = productsRef.push();
//     newProductRef.set({
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl
//     }).then(() => {
//       res.redirect('/admin');
//     }).catch((error) => {
//       console.error('Error adding product:', error);
//       res.status(500).send('Error adding product');
//     });
//   });
  
//   // Delete a product
//   app.post('/delete-product', (req, res) => {
//     const productId = req.body.id;
//     const productRef = db.ref(`products/${productId}`);
//     productRef.remove();
//     res.redirect('/admin');
//   });
  
//   // Update a product
//   app.post('/update-product', (req, res) => {
//     const productId = req.body.id;
//     const productRef = db.ref(`products/${productId}`);
//     productRef.update({
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl
//     });
//     res.redirect('/admin');
//   });

const PORT = 3000;
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
