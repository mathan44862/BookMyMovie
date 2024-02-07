import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { useLoginUserMutation, useSignUpUserMutation } from "../../apis/userLogin";
import BackgroundImage from "./background.jpg"; // Replace with the correct path to your background image
import { useNavigate } from "react-router-dom";

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp: React.FC = () => {
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      // Handle signup logic here
      console.log("Form submitted with values:", values);
    },
  });
  const navigate = useNavigate();
  const [accountNotFound, setAccountNotFound] = useState(false);
  const [signIn] = useSignUpUserMutation();
  const userSignIn = async () => {
    try {
      const response = await signIn(formik.values);
      if ('data' in response) {
        if ('error' in response.data) {
          setAccountNotFound(s => s = true);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Unexpected error during sign-in:', error);
    }
  };
  return (
    <Stack
      sx={{
        alignItems: "center",
        marginTop: "10%",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        margin: "0",
      }}
    >
      <br /><br /><br /><br /><br />
      <Typography variant="h2" component="h2">
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ width: "40ch", marginTop: "1rem" }}
        />
        <br /><br />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ width: "40ch", marginTop: "1rem" }}
        />
        <br /><br />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword
          }
          sx={{ width: "40ch", marginTop: "1rem" }}
        />
        <br /><br />
        <Button
          variant="contained"
          sx={{ width: "45ch", marginTop: "1rem" }}
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          onClick={userSignIn}
        >
          Sign Up
        </Button>
      </form>
    </Stack>
  );
};

export default SignUp;
