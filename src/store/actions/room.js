import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;

export const getRoomByDepartment = async (deparment) => {
  try {
    const response = await fetch(BASE_URL + `/room/${deparment}`);
    const json = await response.json();
    return json.room;
  } catch (err) {
    console.error(err);
  }
};
