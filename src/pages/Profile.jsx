import { useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import handleUpload from "../util/uploadFile";
import Header from "../components/layout/Header";
import { useAuth, useAuthUpdate } from "../contexts/AuthContext";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router";

function ProfileEditor() {
  const navigate = useNavigate();
  const authUpdate = useAuthUpdate();
  const auth = useAuth();
  const { firstname, lastname, id } = auth.user;
  const [firstName, setFirstName] = useState(firstname);
  const [lastName, setLastName] = useState(lastname);
  const [email, setEmail] = useState(auth.user.email);
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    auth.user.profilePicture
  );

  const [errors, setErrors] = useState({});
  // const [url, setUrl] = useState();
  const [percent, setPercent] = useState(0);

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    handleUpload(file, setPercent, setProfilePicture);
    // setProfilePicture(url);
  };

  const handleSaveProfile = async () => {
    const validationErrors = {};
    if (!firstName.trim()) {
      validationErrors.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      validationErrors.lastName = "Last Name is required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    setErrors(validationErrors);

    // If there are no validation errors, proceed with saving the profile
    if (Object.keys(validationErrors).length === 0) {
      const res = await axiosInstance.put(`/users/${id}`, {
        firstname: firstName,
        lastname: lastName,
        profilePicture: profilePicture,
        email: email,
        password: password,
      });
      authUpdate({
        ...auth,
        user: res.data,
      });
      navigate("/");
    }
  };

  return (
    <>
      <Header title={"Profile"} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <label htmlFor="profilePictureInput">
              <Avatar
                alt="Profile Picture"
                src={profilePicture}
                sx={{
                  width: 150,
                  height: 150,
                  cursor: "pointer",
                  m: "auto",
                }}
              />
              {percent && percent !== 100 ? (
                <LinearProgress
                  sx={{ mt: 1 }}
                  variant="determinate"
                  value={percent}
                />
              ) : (
                ""
              )}
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePictureUpload}
              />
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="family-name"
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          {/* Add other common user data fields here */}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSaveProfile}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProfileEditor;
