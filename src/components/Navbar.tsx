import AppBar from "@mui/material/AppBar";
import MUIBox from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar() {
  return (
    <MUIBox component="div" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuaX
          </Typography>
          <Button color="inherit" href="https://github.com/pranav377/quax">
            Github
          </Button>
        </Toolbar>
      </AppBar>
    </MUIBox>
  );
}
