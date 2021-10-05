import { AsyncStorage } from "react-native";
import { environment } from "../../../environment/enviroment";
const BASE_URL = environment.baseURL + "/bmi";

// no await
const token = AsyncStorage.getItem("accountData").then((account) => {
  return JSON.parse(account).token;
});

const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

export const createBMI = async (id, tall, weigh) => {
  return await fetch(BASE_URL, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      patientId: id,
      tall: tall,
      weigh: weigh,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("Create success: " + json);
      return json;
    })
    .catch((error) => {
      console.log("create bmi false:" + error);
      return null;
    });
};
export const getAllBMI = async (patientId) => {
  return await fetch(BASE_URL + "/" + patientId + "/patient", {
    method: "GET",
    headers: header,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res.bmi;
    });
};
