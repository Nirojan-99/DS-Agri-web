import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//pages
import Pages from "./Pages/Pages";
import Footer from "./Components/Footer";

//mui
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { grey } from "@mui/material/colors";

function App() {
  const [mode, setMode] = useState("dark");

  let theme1 = createTheme({
    typography: {
      mode,
      primary: {
        main: "#073050",
      },
    },
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#62BB46",
            },
            status: {
              danger: "#E28743",
            },
            background: {
              default: "#073050",
              paper: "#fff",
              button: "#073050",
            },
            divider: "#62BB46",
            secondary: {
              main: "#62BB46",
            },
            text: {
              primary: "#073050",
              secondary: "#073050",
            },
            success: {
              main: "#073050",
            },
            info: {
              main: "#1597BB",
            },
            // text: {
            //   primary: "#333",
            //   secondary: grey[400],
            // },
          }
        : {
            primary: {
              main: "#62BB46",
              dark: "#073050", 
            },
            secondary: {
              main: "#62BB46",
            },
            divider: "#62BB46",
            background: {
              default: "#073050",
              paper: "#273443",
            },
            components: {
              MuiButton: {
                styleOverrides: {
                  outlined: {
                    backgroundColor: "green",
                  },
                },
              },
            },
            text: {
              primary: "#ddd",
              secondary: grey[400],
            },
            typography: {
              primary: "#fff",
              fontSize: 12,
            },
            success: {
              main: "#ECB365",
            },
            info: {
              main: "#aaa",
            },
          }),
    },
  });

  theme1 = responsiveFontSizes(theme1);

  theme1.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:100px)": {
      fontSize: "1.5rem",
    },
    [theme1.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  theme1.typography.h4 = {
    fontSize: ".6rem",
    "@media (min-width:100px)": {
      fontSize: ".75rem",
    },
    [theme1.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  };
  theme1.typography.subtitle2 = {
    fontSize: ".5rem",
    "@media (min-width:100px)": {
      fontSize: ".5rem",
    },
    [theme1.breakpoints.up("md")]: {
      fontSize: ".75rem",
    },
  };

  const modeHandler = (value) => {
    setMode(value);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme1}>
        <Router>
          <Pages mode={mode} modeHandler={modeHandler} />
        </Router>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
