import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import ShapesInfo from "./components/Info";
import MathJaxContext from "better-react-mathjax/MathJaxContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Navbar />
      <MathJaxContext>
        <ShapesInfo />
      </MathJaxContext>
    </ThemeProvider>
  );
}

export default App;
