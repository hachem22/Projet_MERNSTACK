const app = require('./server-config');
const cors = require('cors');
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow cookies and credentials
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
