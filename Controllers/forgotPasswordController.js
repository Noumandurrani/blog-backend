const nodemailer = require("nodemailer");
const User = require("../Models/User");
const md5 = require("md5");
const ResetLink = require("../Models/ResetLink");
const bcrypt = require("bcrypt");

const sendResetLink = async (mail, hash) => {
  //sender
  var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // reciever
  let info = await transporter.sendMail({
    from: `"Blog"<blogsite@info.com`,
    to: mail,
    subject: "Reset Password",
    text: "Welcome to BlogSite",
    html: `<div><p><a href = 'http://127.0.0.1:4000/?hash=${hash}'>Set a new password</a></p><p>Sincerely</p><p>BlogSite</p></div>`,
  });

  return true;
};

////
const resetLink = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user != null) {
    let currentTimestamp = new Date().getTime();
    let fivMins = 60 * 5 * 1000;
    let expire = currentTimestamp + fivMins;
    let hash = md5(currentTimestamp);

    await ResetLink.create({
      hash: hash,
      email: req.body.email,
      expire: expire,
    });

    await sendResetLink(req.body.email, hash);

    res.status(200).json({
      message: "please check your email",
    });
  } else {
    res.status(401).json({
      message: "user not found!",
    });
  }
};

const forgotPassword = async (req, res) => {
  let result = await ResetLink.findOne({ hash: req.body.hash });
  if (result != null) {
    let CurrentTime = new Date().getTime();
    console.log("current: " + CurrentTime);
    console.log("store: " + result.expire);
    if (result.expire > CurrentTime) {
      if (req.body.new_password == req.body.confirm_password) {
        let salt = await bcrypt.genSalt();
        let encrypt_password = await bcrypt.hash(req.body.new_password, salt);
        await User.findOneAndUpdate(
          { email: result.email },
          {
            password: encrypt_password,
          }
        );
        res.status(200).json({
          success: true,
          message: "your password has updaated successfully",
        });
      } else {
        res.status(401).json({
          success: true,
          message: "new password and confirm password are not same!",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "your link has expired",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "link not valid",
    });
  }
};

module.exports = {
  resetLink,
  forgotPassword,
};

/////////////////////
// const jwt = require("jsonwebtoken");
// const User = require("../Models/User");
// const bcrypt = require("bcrypt");

// const creatToken = async (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60s" });
// };

// // reset Link
// const resetLink = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user != null) {
//     let resetToken = await creatToken(user._id);
//     res.json({
//       message: "forgot password email sent",
//       resetToken: resetToken,
//     });
//   } else {
//     res.json({
//       message: "invalid email",
//     });
//   }
// };

// const forgotPassword = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user != null) {
//     const newPass = req.body.newPass;
//     const confirmPass = req.body.confirmPass;
//     if (newPass == confirmPass) {
//       let salt = await bcrypt.genSalt();
//       let encrypt_password = await bcrypt.hash(req.body.newPass, salt);
//       await User.findOneAndUpdate(user.email, {
//         password: encrypt_password,
//       });
//       res.json({
//         message: "password updated",
//       });
//     } else {
//       res.json({
//         message: "password not matched",
//       });
//     }
//   } else {
//     res.json({
//       message: "invalid email",
//     });
//   }
// };

// module.exports = {
//   resetLink,
//   forgotPassword,
// };

///////////////////

// const sendResetLink = async (req, res) => {
//   //sender
//   var transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: 2525,
//     secure: false,
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   // reciever
//   let info = await transporter.sendMail({
//     from: `"Blog"<blogsite@info.com`,
//     to: req.body.email,
//     subject: "Reset Password",
//     text: "Welcome to BlogSite",
//     html: `<div><p><a href = "#">Set a new password</a></p><p>Sincerely</p><p>BlogSite</p></div>`,
//   });
//   res.json({
//     message: "reset password link send",
//   });
// };

// module.exports = {
//   sendResetLink,
// };
