const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const dashboardRoutes = require('./routes/dashboard');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});
