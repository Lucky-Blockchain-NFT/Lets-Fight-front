import data from '../data.json';
import axios from 'axios';

export const LoginApi = {
  getUser: async (accountName: string) => {
    return await axios
      .post(`${data.customApiEndpoint}/check/user`, {
        wallet: accountName,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.status);
        return error.response.data;
      });
  },
  sendEmail: async (
    accountName: string,
    emailAddress: string,
    nickname: string
  ) => {
    return await axios
      .post(`${data.customApiEndpoint}/send-email`, {
        wallet: accountName,
        email: emailAddress,
        nickname: nickname ? nickname : accountName,
      })
      .catch((error) => error.response.data);
  },
  setNewUser: async (
    accountName: string,
    emailAddress: string,
    nickname: string
  ) => {
    return await axios
      .post(`${data.customApiEndpoint}/new`, {
        wallet: accountName,
        nickname: nickname,
        email: emailAddress,
      })
      .catch((error) => {
        console.log(error);

        return error.response.data;
      });
  },
  confirmEmail: async (accountName: string) => {
    return await axios
      .put(`${data.customApiEndpoint}/update/` + accountName)
      .catch((error) => error.response.data);
  },
};
