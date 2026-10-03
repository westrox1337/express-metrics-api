const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'System Metrics API is operational!',
        endpoints: ['/api/status', '/api/metrics']
    });
});

// Status endpoint
app.get('/api/status', (req, res) => {
    res.json({
        status: 'ONLINE',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} seconds`
    });
});

// Metrics endpoint
app.get('/api/metrics', (req, res) => {
    res.json({
        platform: os.platform(),
        architecture: os.arch(),
        cpuCores: os.cpus().length,
        freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
        totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024))
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
