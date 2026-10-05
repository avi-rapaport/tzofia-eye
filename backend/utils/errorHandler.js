export function errorHandler(err, req, res) {
  const status = err.status || 500;
  const message = err.status ? err.message : 'Internal server error';
  console.error(err.message);
  res.status(status).json({ message });
}
