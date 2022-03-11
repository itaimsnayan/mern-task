var jwt = require("jsonwebtoken");
const sendResponse = (
  res,
  status,
  success = false,
  message = null,
  data = null
) => res.status(status).send({ status, message, data, success });
const createToken = (data) => jwt.sign({ data }, process.env.TOEKN_SECRET);

var getFileExtension = (name) => {
  let arr = name.split(".");
  return "." + arr[arr.length - 1];
};
export { sendResponse, createToken, getFileExtension };
