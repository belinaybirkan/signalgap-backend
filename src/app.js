const express = require('express');
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const gapRoutes = require('./routes/gapRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.disable('x-powered-by');
app.use(logger);
app.use(express.json({ limit: '32kb' }));
app.get('/', (_req, res) => res.json({ name: 'SignalGap API', version: '1.0.0', endpoints: ['/health', '/gaps', '/reports/summary'] }));
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'SignalGap' }));
app.use('/gaps', gapRoutes);
app.use('/reports', reportRoutes);
app.use(notFound);
app.use(errorHandler);
module.exports = app;
