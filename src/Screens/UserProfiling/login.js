import React, { useContext, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import port from "../Port/Port";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import axios from "axios";
import CartProvider from "../../contextApi";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function Login(props) {
  const [credentialValidation, setCredentialValidation] = useState("");
  const { cookies, setCookie, setuserdetails } = useContext(CartProvider);
  console.log("I am in login");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userCredentials = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const result = await axios.post(
        `${port.herokuPort}/users/signin`,
        userCredentials
      );

      if (result.data.data.user.role === "admin") {
        setuserdetails(result.data.data.user);
        setCookie("jwt", result.data, { path: "/" }); //Is sa browser ma cookie store ho rahi ha

        console.log("User details are set now");
      } else {
        setCredentialValidation(
          "Incorrect email or password or you deleted account"
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
      setCredentialValidation(err.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            style={{ width: "100%" }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Typography style={{ color: "red" }}>
              {formik.errors.email ? (
                <Typography>{formik.errors.email}</Typography>
              ) : null}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <Typography style={{ color: "red" }}>
              {formik.errors.password ? (
                <Typography>{formik.errors.password}</Typography>
              ) : null}
            </Typography>
            <p style={{ color: "red" }}>{credentialValidation}</p>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to="#">Forget Password?</Link>
              </Grid>
              <Grid item>
                <Link to="/SignUp">SignUp</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
