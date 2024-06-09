import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { Logo } from "../components/logo";
import { signIn } from "../utils/FirebaseController";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("auth", JSON.stringify({email: values.email, password: values.password}))
      // signIn(values.email, values.password)
      //   .then((res) => {
      //     if (res.user.email === values.email) {
      //       console.log(res.providerData);
      //       localStorage.setItem("auth", JSON.stringify(res.providerData));
             window.location.reload();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("ERROR ====", err);
      //   });
    },
  });

  return (
    <>
      <Head>
        <title>Login | Vast Credit Services</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Grid container>
          <Grid item xs={12} lg={6}>
          <Box
          sx={{ background: "#fff", flex: "1 1 auto", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          
          <form onSubmit={formik.handleSubmit}>
            <Logo
              sx={{
                height: 72,
                width: 72,
              }}
            />
            <Box sx={{mt: 2, mb:4}}>
            <Typography
            color="neutral.700"
            variant="h4"
          >
            Welcome
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Sign In To Internal Platform
          </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
              placeholder="Enter Email"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
              placeholder="Enter Password"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
        </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
          <Box
          sx={{ background: "radial-gradient(50% 50% at 50% 50%, rgb(18, 38, 71) 0%, rgb(9, 14, 35) 100%)", p: 12, height: '100vh', paddingTop: 24 }}>
          <img src="/static/images/sign-in-illustration.svg"
            alt="login_bg" />
        </Box>
          </Grid>
        </Grid>
        
        
      </Box>
    </>
  );
};

export default Login;
