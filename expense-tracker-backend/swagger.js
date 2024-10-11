const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Expense Tracker API',
    description: 'API documentation for the Daily Expense Tracker app',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/userRoutes.js', './routes/expenseRoutes.js', './routes/categoryRoutes.js', './routes/budgetRoutes.js', './routes/dashboardRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);