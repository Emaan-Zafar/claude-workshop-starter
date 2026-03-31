const express = require('express');
const mathRoutes = require('./routes/math');
const paymentRoutes = require('./routes/payments');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/', mathRoutes);
app.use('/payments', paymentRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'claude-workshop-starter',
    version: '1.0.0',
    endpoints: {
      math: ['/add', '/subtract', '/multiply', '/divide'],
      payments: ['/payments/calculate-total', '/payments/apply-discount'],
      users: ['/users/register', '/users/list']
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
