import jwt from "jsonwebtoken";

const Auth = async (req, res, next) => {
  try {
    // get the token from the header if present
    let headerToken =
      req.headers["x-access-token"] || req.headers["authorization"];

    headerToken = headerToken.split(" ")[1];

    // if no token found, return response (without going to the next middleware)
    if (!headerToken) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // if can verify the token, set req.user and pass to next middleware
    const decodedToken = await jwt.verify(headerToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error during Auth:", error);
    res.status(404).json({ success: false, error: "Authentication Failed" });
  }
};

export default Auth;
