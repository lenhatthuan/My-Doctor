import { AsyncStorage } from "react-native";
import { environment } from "../../../environment/enviroment";
const BASE_URL = environment.baseURL + "/emotion";

// no await
// const token = await AsyncStorage.getItem("accountData").then((account) => {
//   return JSON.parse(account).token;
// });

// const header = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   Authorization: "Bearer " + token,
// };

export const add = async (id, emotion, description) => {
  const token = await AsyncStorage.getItem("accountData").then((account) => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  return await fetch(BASE_URL, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      patientId: id,
      emotion: emotion,
      description: description,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("Create success: " + json);
      return json;
    })
    .catch((error) => {
      console.log("create emotion false:" + error);
      return null;
    });
};
export const getAll = async (patientId) => {
  const token = await AsyncStorage.getItem("accountData").then((account) => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return await fetch(BASE_URL + "/" + patientId + "/patient", {
    method: "GET",
    headers: header,
  })
    .then((res) => res.json())
    .then((res) => {
      return res.emotion;
    })
    .catch((error) => {
      return null;
    });
};

export const remove = async (id) => {
  const token = await AsyncStorage.getItem("accountData").then((account) => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return await fetch(BASE_URL + "/" + id + "/delete", {
    method: "PUT",
    headers: header,
  })
    .then((res) => res.json())
    .then((res) => {
      return res.message;
    })
    .catch((error) => {
      return null;
    });
};

export const edit = async (id, emotion, description) => {
  const token = await AsyncStorage.getItem("accountData").then((account) => {
    return JSON.parse(account).token;
  });
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return await fetch(BASE_URL + "/" + id, {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      emotion: emotion,
      description: description,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.emotion;
    })
    .catch((error) => {
      return null;
    });
};
