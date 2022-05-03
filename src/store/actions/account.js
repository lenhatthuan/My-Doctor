import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environment/enviroment';

const BASE_URL = environment.baseURL;
const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export const signin = async (username, pass) => {
  console.log('signin 10');
  return await fetch(BASE_URL + '/accounts/signin', {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      username: username,
      password: pass,
    }),
  })
    .then(response => response.json())
    .then(json => {
      if (json.count > 0) {
        const expirationDate = new Date(new Date().getTime() + 1000000);
        saveDataToStorage(
          json.token,
          json.account.id,
          expirationDate,
          username,
        );
        return json;
      } else return json;
    })
    .catch(error => {
      console.log('sigin fail *********************: ' + error);
      return null;
    });
};

const saveDataToStorage = (token, accountId, expirationDate, username) => {
  try {
    AsyncStorage.setItem(
      'accountData',
      JSON.stringify({
        token: token,
        accountId: accountId,
        expirationDate: expirationDate,
        username: username,
      }),
    );

    AsyncStorage.setItem('id', accountId);
  } catch (error) {
    console.error('save error' + error);
  }
};

export const isLogin = async () => {
  // let account = await AsyncStorage.getItem("accountData");
  // if(account) return false;
  return true;
};

export const isAccount = async phone => {
  try {
    const response = await fetch(BASE_URL + `/accounts/${phone}/username`);
    const json = await response.json();
    return json.count;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async data => {
  return await fetch(BASE_URL + '/accounts', {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      username: data.phone,
      password: data.password,
      role: 'patient',
    }),
  })
    .then(response => response.json())
    .then(result => {
      const expirationDate = new Date(new Date().getTime() + 1000000);
      saveDataToStorage(
        result.token,
        result.account.id,
        expirationDate,
        result.account.username,
      );
      return result;
    })
    .catch(err => console.error(err));
};

export const forgotpass = async data => {
  return await fetch(BASE_URL + '/accounts/forgotPass', {
    method: 'PUT',
    headers: header,
    body: JSON.stringify({
      username: data.phone,
      password: data.password,
    }),
  })
    .then(response => response.json())
    .then(result => console.log(result.message))
    .catch(err => console.error(err));
};

export const changePass = async (id, username, oldPass, newPass) => {
  return await fetch(BASE_URL + `/accounts/${id}/changePass`, {
    method: 'PUT',
    headers: header,
    body: JSON.stringify({
      oldPass: oldPass,
      newPass: newPass,
      username: username,
    }),
  })
    .then(response => response.json())
    .then(result => console.log(result.message))
    .catch(err => console.log(err));
};

export const logout = () => {
  AsyncStorage.removeItem('accountData');
  AsyncStorage.removeItem('patientData');
  AsyncStorage.removeItem('id');
  return true;
};
