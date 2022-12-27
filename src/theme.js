import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    Jost: {
      fontFamily: '"Jost", serif',
    },
    fontFamily: ["League Spartan"].join(","),
    palette: {
      primary: "#FFFFFF",
      secondary: "4A4D4E",
    },
  },
  palette: {
    primary: {
      main: "#F55C6E",
    },
    secondary: {
      main: "#fff",
    },
    tertiary: {
      main: "#000",
    },
  },
});

export default theme;
