import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { Stack } from "@mui/material";
import SideBar from "./components/layout/SideBar";

function App() {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Routes>
        {localStorage.getItem("token") ? (
          <>
            <SideBar />
            <Route path="/" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </>
        )}
      </Routes>
    </Stack>
  );
}

export default App;
