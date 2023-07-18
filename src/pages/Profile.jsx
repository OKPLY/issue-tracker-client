import { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import handleUpload from "../util/uploadFile";

function ProfileEditor() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [url, setUrl] = useState();
  const [percent, setPercent] = useState();

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    // Perform any additional handling of the uploaded file if needed
    setProfilePicture(file);
    handleUpload(file, setPercent, setUrl);
    console.log(">>> url", url);
  };

  const handleSaveProfile = () => {
    const validationErrors = {};
    // Validate first name
    if (!firstName.trim()) {
      validationErrors.firstName = "First Name is required";
    }
    // Validate last name
    if (!lastName.trim()) {
      validationErrors.lastName = "Last Name is required";
    }
    // Validate email
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }
    // Validate password
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }
    // Add additional validation rules if needed

    // Set the validation errors
    setErrors(validationErrors);

    // If there are no validation errors, proceed with saving the profile
    if (Object.keys(validationErrors).length === 0) {
      // Perform saving profile logic here
      console.log("Profile Saved");
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Profile Picture:", profilePicture);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <label htmlFor="profilePictureInput">
            <Avatar
              alt="Profile Picture"
              src={profilePicture ? URL.createObjectURL(profilePicture) : ""}
              sx={{
                width: 150,
                height: 150,
                cursor: "pointer",
                m: "auto",
              }}
            />
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
  );
}

export default ProfileEditor;
