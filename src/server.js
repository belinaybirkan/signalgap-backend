const app = require('./app');
const port = Number(process.env.PORT || 3000);
if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
  console.error('PORT 1-65535 arasında olmalıdır.');
  process.exit(1);
}
app.listen(port, () => console.log(`SignalGap çalışıyor: http://localhost:${port}`));
