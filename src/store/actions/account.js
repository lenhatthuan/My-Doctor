import { AsyncStorage } from "react-native";
import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;
const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const signin = async (username, pass) => {
  return await fetch(BASE_URL + "/accounts/signin", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      username: username,
      password: pass,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("account: " + json.token + " username: " + username);
      const expirationDate = new Date(new Date().getTime() + 1000000);
      saveDataToStorage(json.token, json.account.id, expirationDate, username);
      return json;
    })
    .catch((error) => {
      console.error("sigin fail *********************: " + error);
    });
};

const saveDataToStorage = (token, accountId, expirationDate, username) => {
  try {
    AsyncStorage.setItem(
      "accountData",
      JSON.stringify({
        token: token,
        accountId: accountId,
        expirationDate: expirationDate,
        username: username,
      })
    );
  } catch (error) {
    console.error("save error" + error);
  }
};

export const isLogin = () => {
  const accountData = AsyncStorage.getItem("accountData");
  if (!accountData) {
    return null;
  } else {
    return accountData;
  }
};

export const isAccount = async (phone) => {
  try {
    const response = await fetch(BASE_URL + `/accounts/${phone}/username`);
    const json = await response.json();
    return json.count;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (data) => {
  return await fetch(BASE_URL + "/accounts", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      username: data.phone,
      password: data.password,
      role: "patient",
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      const expirationDate = new Date(new Date().getTime() + 1000000);
      saveDataToStorage(
        result.token,
        result.account.id,
        expirationDate,
        data.phone
      );
      return result;
    })
    .catch((err) => console.error(err));
};

export const forgotpass = async (data) => {
  return await fetch(BASE_URL + "/accounts/forgotPass", {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      username: data.phone,
      password: data.password,
    }),
  })
    .then((response) => response.json())
    .then((result) => result.id)
    .catch((err) => console.error(err));
};

export const changePass = async (password) => {
  await AsyncStorage.getItem("accountData").then((res) => {
    result = JSON.parse(res);
    return fetch(BASE_URL + `/accounts/${result.id}/changePass`, {
      method: "PUT",
      headers: header,
      body: JSON.stringify({
        oldPass: password.old,
        newPass: password.new,
        username: result.username,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  });
};

export const logout = () => {
  AsyncStorage.removeItem("accountData");
  AsyncStorage.removeItem("patientData");
  return true;
};
