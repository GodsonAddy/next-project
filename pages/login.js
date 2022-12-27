import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Button,
  Toolbar,
  AppBar,
  Grid,
  TextField,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import Image from "next/image";
import logo from "../public/assets/bloop-logo.png";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import AuthLayout from "../layout/auth";
import Head from "next/head";

const initialFormValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [loginError, setLoginError] = useState({});
  const { status } = useSession();
  const router = useRouter();

  const { email, password } = formValues;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((values) => ({
      ...values,
      [name]: value,
    }));

    if (value !== "") {
      setLoginError((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setLoginError((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setLoginError((prev) => {
        return { ...prev, email: "Email is required" };
      });
      return;
    }
    if (!password) {
      setLoginError((prev) => {
        return { ...prev, password: "Password is required" };
      });
    }

    const status = signIn("credentials", {
      //redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    console.log("status", status);

    if (status.ok) return router.push(status.url);
  };

  const GoogleSignIn = () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  const FacebookSignIn = () => {
    signIn("facebook", { callbackUrl: "http://localhost:3000" });
  };

  // const signInWithEmail = async ({ email }) => {
  //   let toastId;
  //   try {
  //     toastId = toast.loading("Loading...");
  //     setDisabled(true);
  //     // Perform sign in
  //     const { error } = await signIn("email", {
  //       redirect: false,
  //       callbackUrl: window.location.href,
  //       email,
  //     });
  //     // Something went wrong
  //     if (error) {
  //       throw new Error(error);
  //     }
  //     setConfirm(true);
  //     toast.dismiss(toastId);
  //   } catch (err) {
  //     toast.error("Unable to sign in", { id: toastId });
  //   } finally {
  //     setDisabled(false);
  //   }
  // };

  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography component="h1" variant="h4">
        Welcome Back
      </Typography>
      <Typography variant="body2">Login into your account below</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleInputChange}
              error={!!loginError.email}
              helperText={loginError ? loginError.email : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handleInputChange}
              error={!!loginError.password}
              helperText={loginError ? loginError.password : null}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "secondary.main" }}
          //loading={status === "loading"}
        >
          Login
        </LoadingButton>
        <Grid container mb={3}>
          <Grid item xs>
            <Button
              href="/forgot-password"
              variant="text"
              sx={{ color: "#E60000", fontSize: 15 }}
            >
              {"Forgot password?"}
            </Button>
          </Grid>

          <Grid item>
            <Button
              href="/signup"
              variant="text"
              sx={{ fontSize: 15, color: "#E60000" }}
            >
              {"Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider
        sx={{
          my: 2,
        }}
        flexItem
      >
        OR
      </Divider>
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "tertiary.main",
          color: "secondary.main",
          "&:hover": {
            backgroundColor: "tertiary.main",
            color: "secondary.main",
          },
        }}
        onClick={GoogleSignIn}
      >
        Sign in with Google{" "}
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <Image
            src={"/assets/google.svg"}
            alt="google"
            width={20}
            height={20}
          />
        </span>
      </Button>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        endIcon={<FacebookIcon fontSize="large" />}
        sx={{
          mt: 2,
          backgroundColor: "blue",
          color: "secondary.main",
          "&:hover": {
            backgroundColor: "blue",
            color: "secondary.main",
          },
        }}
        onClick={FacebookSignIn}
      >
        Sign in with Facebook
      </Button>
    </AuthLayout>
  );
};

export default Login;