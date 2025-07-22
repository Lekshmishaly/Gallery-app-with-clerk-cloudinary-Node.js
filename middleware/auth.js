const { authMiddleware } = require("@clerk/clerk-sdk-node");
const User = require("../models/userModel");
const sendResponse = require("../utils/response");

const protect = async (req, res, next) => {
  try {
    // Use Clerk's authMiddleware
    authMiddleware()(req, res, async () => {
      const { userId } = req.auth;

      if (!userId) {
        return sendResponse(res, 401, null, "Unauthorized: Please log in");
      }

      // Find or create user in MongoDB
      let user = await User.findOne({ clerkUserId: userId });
      if (!user) {
        const clerkUser = await req.auth.getUser(userId);
        user = await User.create({
          clerkUserId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
        });
      }

      // Attach user to request
      req.user = { id: user.clerkUserId, mongoId: user._id };
      next();
    });
  } catch (error) {
    sendResponse(res, 500, null, "Authentication error: " + error.message);
  }
};

module.exports = protect;
