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

// Fetch a single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const productRef = db.ref(`products/${productId}`);
  
  productRef.once('value', (snapshot) => {
      const product = snapshot.val();
      if (product) {
          res.json(product);
      } else {
          res.status(404).send('Product not found');
      }
  });
});

// Serve the create account page
app.get('/create-account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'createAccount.html'));
});

// Login functionality
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const usersRef = db.ref('users');
  usersRef.orderByChild('email').equalTo(email).once('value', snapshot => {
      if (snapshot.exists()) {
          const user = snapshot.val();
          const userId = Object.keys(user)[0];
          if (user[userId].password === password) {
              res.status(200).send('Login successful');
          } else {
              res.status(400).send('Invalid password');
          }
      } else {
          res.status(400).send('User not found');
      }
  });
});

// Create account functionality
app.post('/api/create-account', (req, res) => {
  const { name, email, password } = req.body;
  const usersRef = db.ref('users');
  const newUserRef = usersRef.push();
  
  newUserRef.set({
      name: name,
      email: email,
      password: password
  }, (error) => {
      if (error) {
          res.status(500).send('Error creating account');
      } else {
          res.status(200).send('Account created successfully');
      }
  });
});

// Fetch users functionality
app.get('/api/get-users', (req, res) => {
  const usersRef = db.ref('users');
  usersRef.once('value', snapshot => {
      if (snapshot.exists()) {
          const users = snapshot.val();
          const userArray = [];
          for (let id in users) {
              userArray.push({
                  id: id,
                  name: users[id].name,
                  email: users[id].email
              });
          }
          res.json(userArray);
      } else {
          res.status(404).send('No users found');
      }
  });
});

// Delete user functionality
app.delete('/api/delete-user/:id', (req, res) => {
  const userId = req.params.id;
  const userRef = db.ref('users').child(userId);
  
  userRef.remove()
      .then(() => res.json({ status: 'success' }))
      .catch(error => {
          console.error('Error deleting user:', error);
          res.status(500).json({ status: 'error', message: error.message });
      });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
