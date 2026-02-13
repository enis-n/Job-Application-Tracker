require('dotenv').config();
const express = require('express');
const connectDB = require('./database/connection');

const app = express();

connectDB();

app.use(express.json());


/* app.get('/', (req, res) => {
    res.send('API is running...');
});
 */

// Routes
//user routes
app.use('/api/user', require('./routes/user.routes'));

//job routes
app.use('/api/jobs', require('./routes/job.routes'));

//company routes
app.use('/api/companies', require('./routes/company.routes'));

//experience routes
app.use('/api/experience', require('./routes/experience.routes'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server started on port:${PORT}`);
});