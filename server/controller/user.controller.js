import UserModel from "../mongodb/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//POST @ http://localhost:1337/api/register
export async function register(req, res) {
  try {
    // get the data from the request body and remove the spaces
    const username = req.body.username.trim();
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    // Check for spaces in the input
    const noSpacesRegex = /^\S+$/;
    if (
      !noSpacesRegex.test(username) ||
      !noSpacesRegex.test(email) ||
      !noSpacesRegex.test(password)
    ) {
      return res.status(400).json({
        success: false,
        error: "Username, email, and password cannot contain spaces.",
        errorCode: "INPUT_VALIDATION_ERROR",
      });
    }

    // check if the username and email is provided
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        error: "Username and email are required.",
        errorCode: "INPUT_VALIDATION_ERROR",
      });
    }

    // check the existing username and email
    const existUsername = await UserModel.findOne({ username: username });
    const existEmail = await UserModel.findOne({ email: email });

    // check if the username already exists
    if (existUsername) {
      console.log("Username already exists");
      return res.status(409).json({
        success: false,
        error: "Username already in use.",
        errorCode: "USERNAME_ALREADY_EXISTS",
      });
    }

    // check if the email already exists
    if (existEmail) {
      console.log("Email already exists");
      return res.status(409).json({
        success: false,
        error: "Email address already in use.",
        errorCode: "EMAIL_ALREADY_EXISTS",
      });
    }

    // check if the password is provided
    if (!password) {
      return res.status(400).json({
        success: false,
        error: "Password is required.",
        errorCode: "INPUT_VALIDATION_ERROR",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = new UserModel({
      username,
      name,
      email,
      password: hashedPassword,
    });

    // save the user
    const savedUser = await user.save();

    // sign the token
    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: savedUser,
      token: token,
    });
  } catch (error) {
    if (error.errors?.email?.kind === "user defined") {
      console.error("Registration failed: Invalid Gmail address.");
      return res.status(400).json({
        success: false,
        error: "Invalid Gmail address.",
        errorCode: "INVALID_GMAIL_ADDRESS",
      });
    }

    console.error("Registration failed: unknown reason.");
    return res.status(500).json({
      success: false,
      error: "Unknown reason, please try again later.",
      errorCode: "UNKNOWN_ERROR",
    });
  }
}

//! =========================================================
//* Not needed for now but can use for extra verification
//* Just add the below line in the route.js file 👇
// todo: router.route("/login").post(userController.verifyUser, userController.login);

// ========================================
// middleware to verify the user
export async function verifyUser(req, res, next) {
  try {
    const { email } = req.method === "GET" ? req.query : req.body;
    // check if the user exists
    let exist = await UserModel.findOne({ email });
    if (!exist) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
        userNotFound: true,
      });
    }
    next();
  } catch (error) {
    console.error("Error during verifyUser:", error);
    res.status(404).json({ success: false, error: "User not found." });
  }
}
//! =========================================================

// POST @ http://localhost:1337/api/login
export async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials. Please check your email or password.",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials. Please check your email or password.",
      });
    }
    // create a jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      user: { userId: user._id, username: user.username, email: user.email },
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

// POST @ http://localhost:1337/api/registerEmail
export async function registerEmail(req, res) {
  res.json({ message: "This is the registerEmail route" });
}

// POST @ http://localhost:1337/api/authenticate
export async function authenticate(req, res) {
  res.json({ message: "This is the authenticate route" });
}

// GET @ http://localhost:1337/api/user/:username
export async function getUser(req, res) {
  try {
    const { username } = req.params;
    console.log("username:", username);
    if (!username) {
      return res.status(401).json({
        success: false,
        message: "Username is required.",
        usernameRequired: true,
      });
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    // remove the password from the response
    // remove unwanted fields from the response
    const { password, ...rest } = Object.assign({}, user.toJSON());
    return res.status(201).send({ success: true, user: rest });
  } catch (error) {
    console.error("Error during getUser:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

// GET @ http://localhost:1337/api/generateOTP
export async function generateOTP(req, res) {
  res.json({ message: "This is the generateOTP route" });
}

// GET @ http://localhost:1337/api/verifyOTP
export async function verifyOTP(req, res) {
  res.json({ message: "This is the verifyOTP route" });
}

// GET @ http://localhost:1337/api/resetSession
export async function resetSession(req, res) {
  res.json({ message: "This is the resetSession route" });
}

// PUT @ http://localhost:1337/api/updateUser
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).send({ error: "User not found...!" });
    }

    const { password, ...body } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      body.password = hashedPassword;
    }

    // update the data
    const result = await UserModel.updateOne({ _id: userId }, body);

    if (result.nModified === 0) {
      return res.status(404).json({
        success: false,
        error: "No matching record found, user update failed.",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Record updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error during updateUser:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

// PUT @ http://localhost:1337/api/resetPassword
export async function resetPassword(req, res) {
  res.json({ message: "This is the resetPassword route" });
}

// PUT @ http://localhost:1337/api/totalTokens
export async function totalTokens(req, res) {
  try {
    const { userId } = req.query;
    console.log("userIdForTotalToken", userId);
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let totalToken = user.credits || 0;

    if (req.method === "PUT") {
      const { totalToken: newTotalToken } = req.body;
      user.credits = newTotalToken;
      await user.save();
      totalToken = user.credits;
    }

    res.json({ totalToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET @ http://localhost:1337/api/loggedUser
export async function loggedUser(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    const userId = decoded.userId;
    console.log("userId", userId);
    const userName = decoded.username;
    console.log("userName", userName);
    res.status(200).json({ success: true, userId, userName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
/* 
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Webhook secret from CLI
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// GET @ http://localhost:1337/api/webhook
export async function webhook(request, response) {
  let event = request.body;
  const signature = request.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      endpointSecret
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return response.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const totalAmountMoney = session.amount_total;
    console.log(totalAmountMoney);

    let newToken = 10000;
    let upgradeToken;

    if (totalAmountMoney === 8000) {
      console.log("Starter Package");
      upgradeToken = newToken;
    } else if (totalAmountMoney === 16000) {
      console.log("Starter Package * 2");
      upgradeToken = newToken * 2;
    } else if (totalAmountMoney === 24000) {
      console.log("Starter Package * 3");
      upgradeToken = newToken * 3;
    } else if (totalAmountMoney === 80000) {
      console.log("Pro Package");
      upgradeToken = newToken * 10;
    }

    const customerEmail = session.customer_email;
    const user = await UserModel.findOne({ email: customerEmail });
    if (!user) {
      console.log("User not found");
    } else {
      let totalToken = user.credits || 0;
      totalToken += upgradeToken;
      user.credits = totalToken;
      await user.save();
      console.log("User updated" + user.credits);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  response.sendStatus(200);
}
 */