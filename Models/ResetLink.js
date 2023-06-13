const mongoose = require("mongoose");
const ResetLinkSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
    },
    email: {
      type: String,
    },
    expire: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ResetLink = mongoose.model("ResetLink", ResetLinkSchema);
module.exports = ResetLink;
