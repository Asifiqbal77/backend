// loginregcontroller (replace your existing file with this)
// NOTE: keeps same exports and logic but ensures token is always created,
// returned in body and set as Authorization header for frontend usage.

import User from '../model/auth.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Read secret from env (recommended) or fallback (change fallback for production)
const JWT_SECRET = process.env.JWT_SECRET || "replace_this_with_secure_secret";
const TOKEN_EXPIRES_IN = "1h"; // adjust as needed

// Registration controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already used!" });

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPass });
    await user.save();

    // create JWT for the newly registered user
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    // set token in Authorization header as well as returning in body
    res.setHeader("Authorization", `Bearer ${token}`);

    // debug log (remove in production)
    console.log(`Registered user ${email} - token created: ${token}`);

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password!" });

    // create JWT for successful login
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    // set token in Authorization header as well as returning in body
    res.setHeader("Authorization", `Bearer ${token}`);

    // debug log (remove in production)
    console.log(`Login user ${email} - token created: ${token}`);

    res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // do not return password hashes
    res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("getUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a user by ID (PUT)
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user });
  } catch (err) {
    console.error("updateUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// the below is original code
// import User from '../model/auth.model.js';
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Read secret from env (recommended) or fallback (change fallback for production)
// const JWT_SECRET = process.env.JWT_SECRET || "replace_this_with_secure_secret";
// const TOKEN_EXPIRES_IN = "1h"; // adjust as needed

// // Registration controller
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ message: "Email already used!" });
//     const hashedPass = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPass });
//     await user.save();

//     // create JWT for the newly registered user
//     const token = jwt.sign(
//       { id: user._id, email: user.email, name: user.name },
//       JWT_SECRET,
//       { expiresIn: TOKEN_EXPIRES_IN }
//     );

//     res.json({
//       message: "User registered successfully!",
//       user: { id: user._id, name: user.name, email: user.email },
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Login controller
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found!" });
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(400).json({ message: "Invalid password!" });

//     // create JWT for successful login
//     const token = jwt.sign(
//       { id: user._id, email: user.email, name: user.name },
//       JWT_SECRET,
//       { expiresIn: TOKEN_EXPIRES_IN }
//     );

//     res.json({
//       message: "Login successful!",
//       user: { id: user._id, name: user.name, email: user.email },
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all users
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password"); // do not return password hashes
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get a single user by ID
// export const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update a user by ID (PUT)
// export const updateUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email },
//       { new: true }
//     ).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User updated", user });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete a user by ID
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };