import { AsyncStorage } from "react-native";
import { environment } from "../../../environment/enviroment";
const BASE_URL = environment.baseURL + "/heartBeat";

// no await
// const token = await AsyncStorage.getItem("accountData").then((account) => {
//   return JSON.parse(account).token;
// });

// const header = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   Authorization: "Bearer " + token,
// };

export const createHeart = async (id, systole,  diastole, heartBeat) => {
    const token =  await AsyncStorage.getItem("accountData").then((account) => {
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
      diastole: diastole,
      systole: systole,
      heartBeat:heartBeat
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("Create success: " + json);
      return json;
    })
    .catch((error) => {
      console.log("create heart false:" + error);
      return null;
    });
};
export const getAllHeart= async (patientId) => {
    const token =  await AsyncStorage.getItem("accountData").then((account) => {
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
        console.log("heart: " + res.heartBeat)
      return res.heartBeat;
    }) .catch((error) => {
        console.log("null")
        return null;
      });
};




