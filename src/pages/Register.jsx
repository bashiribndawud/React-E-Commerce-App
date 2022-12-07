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
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const theme = useTheme();
  const {signUp} = useAuth();
  const navigate = useNavigate()
  async function handleRegister(evt) {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    await signUp(data.get("email"), data.get("password"), data.get("name"));
    navigate("/login");
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
          Sign Up
        </Typography>

        <Box component={"form"} sx={{ width: "100%", mt: 1 }} onSubmit={(e) => handleRegister(e)}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            autoFocus
            autoComplete="off"
          ></TextField>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            type="email"
            autoComplete="current-password"
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
            Sign Up
          </Button>
        </Box>
        <Grid container justifyContent={"flex-end"}>
          <Link href="/login" variant="body2">Aleady have an account? Sign In</Link>
        </Grid>
      </Box>
    </Container>
  );
}
