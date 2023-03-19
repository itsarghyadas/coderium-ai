const validateRequest = (req, res, next) => {
  try {
    const { messages } = req.body;
    if (!messages) {
      const error = new Error("Message is required");
      error.statusCode = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateRequest;
