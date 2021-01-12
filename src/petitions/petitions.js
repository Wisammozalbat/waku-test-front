import axios from "axios";

let PORT = process.env.REACT_APP_SERVER_PORT || 4000;

export const request = async (route, method, data = {}, token) => {
  const result = await axios({
    method: method,
    url: `http://localhost:${PORT}/${route}`,
    headers: { Authorization: `Bearer ${token}` },
    data: { ...data },
  });
  return result;
};
