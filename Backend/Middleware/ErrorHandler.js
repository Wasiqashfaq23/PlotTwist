const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  try {
    let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message || 'Server Error';

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found';
    }

    if (err.code === 11000) {
      statusCode = 400;
      message = 'Duplicate field value entered';
    }

    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(err.errors)
        .map((val) => val.message)
        .join(', ');
    }

    console.error(`Error [${statusCode}]:`, message);
    if (process.env.NODE_ENV !== 'production') {
      console.error('Stack:', err.stack);
    }

    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  } catch (handlerError) {
    console.error('Error handler error:', handlerError.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { notFound, errorHandler };
