const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user
  });
};

module.exports = {
  getProfile
};