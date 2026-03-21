function notFoundMiddleware(_req, res) {
  res.status(404).json({ message: 'Route not found.' });
}

function errorMiddleware(error, _req, res, _next) {
  const statusCode = error.statusCode ?? 500;
  const message = error.message ?? 'Internal server error.';
  const details = error.details ?? undefined;

  res.status(statusCode).json({ message, details });
}

export { notFoundMiddleware, errorMiddleware };
