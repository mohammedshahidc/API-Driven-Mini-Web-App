// Middlewares/errorHandler.js
const errorManager = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    const status = "error";
  
    console.error(err); // For debugging
  
    res.status(statusCode).json({
      statusCode,
      status,
      message,
    });
  };
  
  export default errorManager;
  