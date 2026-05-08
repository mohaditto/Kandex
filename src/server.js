require('dotenv').config();

try {
    const app = require('./app');

    const PORT = process.env.PORT || 2608;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
}