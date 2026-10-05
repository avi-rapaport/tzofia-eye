export function errorHandler(err, req, res) {
  const status = err.status || 500;
  const message = err.status ? err.message : 'Internal server error';
  res.status(status).json({ message });
}
