import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  async function Login(event) {
    event.preventDefault();
    const { email, password } = event.target;
    await signIn(email.value, password.value);
    navigate("/home");
  }
  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "whitesmoke",
          borderRadius: theme.spacing(2),
          padding: theme.spacing(3),
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlined />
        </Avatar>

        <Typography variant="h5" component={"h1"}>
          Sign In
        </Typography>

        <form sx={{ width: "100%", mt: 1 }} onSubmit={Login}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            autoComplete="off"
          ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            autoFocus
            type="password"
            autoComplete="current-password"
          ></TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
            fullWidth
          >
            Sign In
          </Button>
        </form>
        <Grid container justifyContent={"flex-end"}>
          <Link href="/register" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Box>
    </Container>
  );
}
