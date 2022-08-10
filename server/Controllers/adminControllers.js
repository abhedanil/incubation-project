
const adminModel = require("../Models/adminModel");
const ApplicationModel = require("../Models/ApplicationModel");
const SlotsModel = require("../Models/SlotsModel")
const jwt = require("jsonwebtoken");
const applicationModel = require("../Models/ApplicationModel");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "admin super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message === "incorrect Email")
    errors.email = "That email is not registerd";
  if (err.message === "incorrect Password")
    errors.email = "That Password is Incorrect";
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.adminlogin = async (req,res,next) => {
    try {
  
      const { email, password } = req.body;
      const admin = await adminModel.login(email, password);
      const token = createToken(admin._id);
      res.cookie("jwt", token, {
        withCrdentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.status(200).json({ admin: admin._id, created: true });
    } catch (err) {
      const errors = handleErrors(err);
      res.json({ errors, created: false });
    }
  }





module.exports.newdata = async (req, res, next) => {
  try {
    const datas = await ApplicationModel.find({ status: "New" });
    res.json({ datas, status: true });
  } catch (err) {}
};
module.exports.PendingApplications = async (req, res, next) => {
  try {
    const data = await ApplicationModel.find({ status: "Pending" });
    res.json({ data, status: true });
  } catch (err) {}
};
module.exports.AllApplications = async (req, res, next) => {
  try {
    const data = await ApplicationModel.find({});
    res.json({ data, status: true });
  } catch (err) {}
};

module.exports.changeStatus = async (req, res, next) => {
  try {
    const datas = req.body;
    const data = await ApplicationModel.findByIdAndUpdate(
      { _id: datas.id },
      { status: datas.status }
    );
    res.json({ data, datas, status: "Pending" });
  } catch (err) {}
};
module.exports.allSlots = async (req, res, next) => {
  try {
    const Slots = await SlotsModel.find();
    res.json(Slots);
  } catch (err) {}
};

module.exports.SlotUpdate = async (req, res, next) => {
  try {
    const { appliId, slotId, slotSection,slotnumber } = req.body;
    const applicationdata = await applicationModel.findOneAndUpdate(
      { _id: appliId },
      { $set: { bookingStatus: true, slotCode: slotId,section:slotSection,slot_no:slotnumber, status: "Booked" } }
    );
    const data = await SlotsModel.findOneAndUpdate(
      { _id: slotId },
      {
        $set: {
          selected: true,
          companyname: applicationdata.companyName,
          user_email: applicationdata.email,
        },
      }
    );
    res.json({ applicationdata, data, status: true });
  } catch (err) {}
};

module.exports.viewApplication = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const id=req.params.id
    const data=await applicationModel.findById({_id:id})
    console.log(data);
    res.json({data, status: true });
  } catch (err) {}
};
