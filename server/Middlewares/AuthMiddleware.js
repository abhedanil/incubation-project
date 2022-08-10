const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
module.exports = {
  checkUser : (req, res, next) => {
    console.log("inside checkuser");
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token,"super secret key",
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
            next();
          } else {
            const user = await UserModel.findById(decodedToken.id);
            if (user) res.json({ status: true, user: user.email });
            else res.json({ status: false });
            next();
          }
        }
      );
    } else {
      res.json({ status: false });
      next();
    }
  }
  
}
