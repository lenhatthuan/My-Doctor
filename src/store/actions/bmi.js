import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environment/enviroment';
const BASE_URL = environment.baseURL + '/bmi';

// no await
// const token = await AsyncStorage.getItem("accountData").then((account) => {
//   return JSON.parse(account).token;
// });

// const header = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   Authorization: "Bearer " + token,
// };

export const createBMI = async (id, tall, weigh) => {
  const token = await AsyncStorage.getItem('accountData').then(account => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return await fetch(BASE_URL, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      patientId: id,
      tall: tall,
      weigh: weigh,
    }),
  })
    .then(res => res.json())
    .then(json => {
      console.log('Create success: ' + json);
      return json;
    })
    .catch(error => {
      console.log('create bmi false:' + error);
      return null;
    });
};
export const getAllBMI = async patientId => {
  const token = await AsyncStorage.getItem('accountData').then(account => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  return await fetch(BASE_URL + '/' + patientId + '/patient', {
    method: 'GET',
    headers: header,
  })
    .then(res => res.json())
    .then(res => {
      return res.bmi;
    })
    .catch(error => {
      return null;
    });
};

export const deleteBMI = async id => {
  const token = await AsyncStorage.getItem('accountData').then(account => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  return await fetch(BASE_URL + '/' + id + '/delete', {
    method: 'PUT',
    headers: header,
  })
    .then(res => res.json())
    .then(res => {
      return res.message;
    })
    .catch(error => {
      return null;
    });
};

export const updateBMI = async (id, tall, weigh) => {
  const token = await AsyncStorage.getItem('accountData').then(account => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  return await fetch(BASE_URL + '/' + id, {
    method: 'PUT',
    headers: header,
    body: JSON.stringify({
      tall: tall,
      weigh: weigh,
    }),
  })
    .then(res => res.json())
    .then(res => {
      return res.bmi;
    })
    .catch(error => {
      return null;
    });
};
