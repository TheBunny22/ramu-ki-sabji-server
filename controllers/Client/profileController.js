const { hashPassword } = require("../../helpers/EncryptingPass");
const { User } = require("../../models/userModel");

// reset Password , Add address , Remove Address , change details
const resetPassword = async (_id, newPass) => {
  if (!_id || !newPass) {
    return null;
  }

  try {
    const hash = hashPassword(newPass);
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { password: hash } },
      { new: true }
    );

    if (!user) {
      throw new Error("--:: User not found ::--");
    }

    return true;
  } catch (error) {
    console.error(error.message);
    throw new Error(
      "--:: DB Error generated while updating user's password ::--"
    );
  }
};

const add_Address = async (_id, add_name, street, landmark) => {
  if (!_id || !add_name || !street || !landmark) {
    return null;
  }
  const address = {
    add_name,
    street,
    landmark,
  };
  const Updated = await User.addAddress(_id, address);
  if (!Updated) {
    return null;
  }
  return true;
};

const remove_address = async (_id, add_name) => {
  if (!_id || !add_name) {
    return null;
  }
  const updated = await User.removeAddress(_id, add_name);
  if (!updated) {
    return null;
  }
  return true;
};
const update_mobile = async (_id, mobile) => {
  if (!_id || !add_name) {
    return null;
  }
  const updated = await User.findOneAndUpdate(
    { _id: _id },
    { $set: { mobile: mobile } },
    { new: true }
  );
  if (!updated) {
    return null;
  }
  return true;
};
const update_email = async (_id, email) => {
  if (!_id || !add_name) {
    return null;
  }
  const updated = await User.findOneAndUpdate(
    { _id: _id },
    { $set: { email: email } },
    { new: true }
  );
  if (!updated) {
    return null;
  }
  return true;
};

const UpdateProfile = async (req, res) => {
  try {
    const { updateType, data } = req.body;
    const { _id } = req.user;
    let update;
    switch (updateType) {
      case "reset_password":
        update = resetPassword(_id, data.password);
        break;
      case "add_address":
        update = add_Address(_id, data.add_name, data.street, data.landmark);
        break;
      case "remove_address":
        update = remove_address(_id, data.add_name);
        break;
      case "update_email":
        update = update_email(_id, data.email);
        break;
      case "update_mobile":
        update = update_mobile(_id, data.mobile);
        break;
      default:
        return res.status(400).json({ msg: "Provide updateType in json body" });
    }
    return res
      .status(200)
      .json({ msg: `Update type : ${updateType} is done`, updated: update });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error " });
  }
};

module.exports = { UpdateProfile };
