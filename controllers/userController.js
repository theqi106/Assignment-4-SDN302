const User = require("../models/users");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { fullName } = req.body;
  try {
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName },
      { new: true }
    ).select("-password");

    if (user) {
      user = user.toObject();
      delete user.password;

      res.json({
        success: true,
        message: "User information updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
