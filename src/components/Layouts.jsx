import React from 'react'
import Header from "../components/Header";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Outlet } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: "light",
    }
})

export default function Layouts() {
  return (
    <ThemeProvider theme={theme}>
        {/* remove default p:0 m:0 box-sizing */}
        <CssBaseline />
        <Header />
        <main>
            <Outlet />
        </main>
        <footer></footer>
    </ThemeProvider>
  )
}
