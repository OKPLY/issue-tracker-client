import axios from "axios";
import { useAuthUpdate } from "../contexts/AuthContext";

axios.defaults.baseURL = "http://localhost:8080";

const localStorage = window.localStorage;

export default async function signin(data, authUpdate) {
  try {
    const response = await axios.post("/uaa/login", {
      email: data.email,
      password: data.password,
    });

    // Save the token to localStorage or any other desired location

    var data = response.data;

    data.permissions = [
      ...new Set(
        data?.user?.roles
          ?.map((role) => role.permissions?.map((p) => p.name))
          .flat()
      ),
    ];

    localStorage.setItem("user", JSON.stringify(data));
    authUpdate(data);
  } catch (error) {
    throw error;
  }
}

export async function signup(data, authUpdate) {
  try {
    //console.log(">>>", data);

    const response = await axios.post("/uaa/signup", {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
    //console.log("heree>>>", res);

    localStorage.setItem("user", JSON.stringify(response.data));
    // authUpdate(response.data);
  } catch (error) {
    throw error;
  }
}
export async function getLoggedInUser() {
  try {
    const res = await axios.post("/uaa/loggedinuser", {
      //TODO
    });
  } catch (error) {
    throw error;
  }
}
