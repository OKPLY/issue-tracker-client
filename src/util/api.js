import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080";

const localStorage = window.localStorage;

export default async function signin(data) {

    try {
        const response = await axios.post("/uaa/login", {
            email: data.email,
            password: data.password
        });
        const token = response.data.token;

        // Save the token to localStorage or any other desired location
        localStorage.setItem('token', token);


    } catch (error) {
        throw error;
    }
}

export async function signup(data) {

    try {
        console.log(">>>",data)

       const res =await axios.post("/uaa/signup", {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        });
        console.log("heree>>>",res)



    } catch (error) {
        throw error;
    }
}
export async function getLoggedInUser() {

    try {

       const res =await axios.post("/uaa/loggedinuser", {
           //TODO
        });



    } catch (error) {
        throw error;
    }
}

