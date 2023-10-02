const { User } = require("../../models/userModel");

const getCartItem = async (req, res) => {
  try {
    const _id = req.user._id;
    // console.log(req.user)
    if (!_id) {
      return res.status(400).json({ msg: "provide user id for getting cart" });
    }
    const cart = await User.getCart(_id);
    return res.status(200).json({ cart });
  } catch (error) {
    console.log(`-->> ${new Date()} Error Occured While fetching cart <<--`);
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error while fething cart" });
  }
};

module.exports = {
  getCartItem,
};
