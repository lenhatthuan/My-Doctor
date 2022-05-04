import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environment/enviroment';

const BASE_URL = environment.baseURL;
const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getPatientById = async patientId => {
  return await fetch(BASE_URL + `/patient/${patientId}`, {
    method: 'GET',
    Headers: header,
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
