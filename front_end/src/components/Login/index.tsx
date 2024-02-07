import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../apis/userLogin";
import BackgroundImage from "./background.jpg"; // Replace with the correct path to your background image
import Logo from './bmtlogo.png';
import validate from "./utils";

const HomePage = () => {
  const navigate = useNavigate();
  const [accountNotFound, setAccountNotFound] = useState(false);
  const [signIn] = useLoginUserMutation();

  const userSignIn = async () => {
    try {
      const response = await signIn(formik.values);
      if ('data' in response) {
        if ('error' in response.data) {
          setAccountNotFound(s => s = true);
        } else {
          localStorage.setItem('email', formik.values.email);
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('Unexpected error during sign-in:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      // Custom logic for form submission if needed
    },
  });

  return (
    <div style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', margin: '0' }}>
      <Stack sx={{ alignItems: 'center' }}>
        <br /><br /><br /><br /><br />
        <img src={Logo} alt="logo" width={"200px"} />
        {accountNotFound && <span style={{ color: 'red' }}><br />Account Not Found</span>}
        <form>
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            sx={{ width: '40ch' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <span style={{ color: 'red' }}><br />{formik.errors.email}</span>}
          <br /><br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            sx={{ width: '40ch' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <span style={{ color: 'red' }}><br />{formik.errors.password}</span>}
          <br />
          <br />
          <Typography component="h6" sx={{ color: "blue", cursor: 'pointer' }} onClick={() => navigate("/signup")}>Create new Account ?</Typography><br />
          <Button variant="contained" sx={{ width: '45ch' }} disabled={!(formik.isValid && formik.dirty)} onClick={userSignIn}>Sign In</Button><br /><br />
        </form>
      </Stack>
    </div>
  );
}

export default HomePage;
