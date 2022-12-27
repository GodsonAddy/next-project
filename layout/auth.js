import React from "react";
import { Box, Link, Toolbar, AppBar, Container } from "@mui/material";
import Image from "next/image";
import logo from "../public/assets/bloop-logo.png";

const AuthLayout = ({ children }) => {
  return (
    <Box>
      <AppBar
        component="nav"
        sx={{
          color: "primary.main",
          backgroundColor: "secondary.main",
          boxShadow: "none",
        }}
        position="static"
      >
        <Toolbar variant="regular">
          <Box>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Login */}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
            mb: 10,
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
