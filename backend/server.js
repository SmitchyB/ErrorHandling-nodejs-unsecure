// server.js for Node.js/Express Vulnerable Build (Insecure Error Handling)

const express = require('express'); // Importing express to create the server
const cors = require('cors'); // Importing cors to handle Cross-Origin Resource Sharing
const app = express(); // Create an instance of express
const PORT = 5000; // Define the port on which the server will listen (can be 5000 or other)

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// --- THIS IS THE VULNERABLE ENDPOINT ---
// It triggers an unhandled exception to demonstrate insecure error handling.
app.post('/api/error/trigger', (req, res) => {
    console.log('--- RECEIVED REQUEST TO TRIGGER ERROR ---');
    // Log the received input to show what led to the exposure
    console.log(`Input received from client: "${req.body.simulatedInput || 'null'}"`);
    console.log('--- INTENTIONAL VULNERABILITY DEMO: Triggering Unhandled Exception for Insecure Error Handling ---');
    console.log('--- EXPECT TO SEE A DETAILED STACK TRACE IN BROWSER/CLIENT RESPONSE ---');

    // INTENTIONAL VULNERABILITY: Cause an unhandled exception
    // This will trigger Express's default error handling middleware,
    // which in a development environment, typically sends a stack trace.
    throw new Error('This is an intentional unhandled error for demonstration purposes.');

    // This line will not be reached due to the exception above.
    res.status(200).json({ message: "This should not be reached." });
});

// --- INTENTIONAL VULNERABILITY: No custom error handling middleware ---
// In a secure application, you would implement a custom error handling middleware here,
// like:
// app.use((err, req, res, next) => {
//   console.error('Internal Server Error:', err.stack); // Log stack trace internally only
//   res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' }); // Generic message to client
// });
// By omitting this, we demonstrate the vulnerability.

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Node.js Unsecure Backend (Error Handling) listening on http://localhost:${PORT}`);
    console.log('Ready to demonstrate insecure error handling.');
});