import axios from "axios";
const sendRequest = async ({ url, method }, data) => {
  let apiurl = process.env.REACT_APP_BACKEND_URL + "/api" + url;
  try {
    return await axios({
      url: apiurl,
      method,
      data,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
  } catch (error) {
    return { error: error.response.data };
  }
};

export { sendRequest };
