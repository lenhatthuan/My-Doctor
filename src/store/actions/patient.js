import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environment/enviroment';
import axios from 'axios';
const BASE_URL = environment.baseURL;
const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const updateAvatar = async (data, patientId) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    crossDomain: 'true',
  };

  // return new Promise((resolve, reject) => {
  //   axios
  //     .request({
  //       method: 'POST',
  //       url: `${BASE_URL}/patient/${patientId}/`,
  //       headers: {
  //         ...headers,
  //       },
  //       data: data,
  //     })
  //     // .post(`${BASE_URL}/patient/${patientId}/`, data)
  //     .then(res => {
  //       console.log({res});
  //       resolve(res);
  //     })
  //     .catch(err => {
  //       console.log({err});
  //     });
  // });

  const formData = new FormData();
  formData.append('image', data);

  try {
    const response = await fetch(BASE_URL + `/patient/${patientId}`, {
      // give something like https://xx.yy.zz/upload/whatever
      method: 'POST',
      body: formData,
      headers: headers,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    return console.log('uploadImage error:', error);
  }
};

export const getPatientById = async patientId => {
  return await fetch(BASE_URL + `/patient/${patientId}`, {
    method: 'GET',
    headers: header,
  })
    .then(response => response.json())
    .then(json => {
      if (json.patient) savePatientToStorage(json.patient);
      return json;
    })
    .catch(err => {
      console.error('Get patient by id fail: ' + err);
    });
};

const savePatientToStorage = patient => {
  AsyncStorage.setItem(
    'patientData',
    JSON.stringify({
      patientId: patient.id,
      fullName: patient.fullName,
      avatar: patient.avatar,
      birthDate: patient.birthDate,
      gender: patient.gender,
      address: patient.address,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    }),
  );
};

export const updateProfile = async (
  id,
  avatar,
  fullName,
  birthDate,
  gender,
  address,
) => {
  return await fetch(BASE_URL + '/patient/' + id, {
    method: 'PUT',
    headers: header,
    body: JSON.stringify({
      avatar: avatar,
      fullName: fullName,
      birthDate: birthDate,
      gender: gender,
      address: address,
    }),
  })
    .then(response => response.json())
    .then(result => console.log(result.message))
    .catch(err => console.log(err));
};

export const updateToken = async (id, token) => {
  return await fetch(BASE_URL + '/patient/token/notification', {
    method: 'PUT',
    headers: header,
    body: JSON.stringify({
      id: id,
      token: token,
    }),
  })
    .then(response => response.json())
    .then(result => console.log(result.message))
    .catch(err => console.log(err));
};

export const getAge = async () => {
  try {
    const response = AsyncStorage.getItem('patientData');
    const patient = JSON.parse(response);
    return new Date().getFullYear - new Date(patient.birthDate).getFullYear();
  } catch (error) {
    console.log(error);
  }
};
