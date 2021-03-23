import Axios from 'axios';

const debitsBaseUrl = process.env.REACT_APP_DEBITS_CLIENT_API;

export const JsonPlaceholderClientApi = Axios.create({
  baseURL: process.env.REACT_APP_JSON_PLACEHOLDER,
});

export const DebitClientApi = Axios.create({
  baseURL: `${debitsBaseUrl}`,
});
