import Container from "@mui/material/Container";
import { useEffect } from "react";
import ShapesData from "../Shapes/ShapesData";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "../OrbitControls";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import Volume from "./Calculations/Volume";
import SurfaceArea from "./Calculations/SurfaceArea";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function ShapesInfo() {
  // doing this for closing drawer on back button click
  useEffect(() => {
    history.pushState(null, document.title, location.href);
  }, []);

  const [currShapeIdx, setCurrShapeIdx] = useState(0);
  const currShape = ShapesData[currShapeIdx];

  const [tab, setTab] = useState(0);
  const theme = useTheme();

  return (
    <>
      <Container sx={{ p: 4, pb: 8 }} maxWidth="sm" role="presentation">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl
            fullWidth
            sx={{
              maxWidth: "sm",
            }}
          >
            <InputLabel id="shape-select-label" variant="outlined">
              Shape
            </InputLabel>
            <Select
              labelId="shape-select-label"
              id="shape-select"
              value={currShape.name}
              label="Shape"
            >
              {ShapesData.map((shape, idx) => (
                <MenuItem
                  value={shape.name}
                  key={idx}
                  onClick={() => setCurrShapeIdx(idx)}
                >
                  <Typography variant="h6">{shape.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: "100%", height: "30vh" }}>
          <Canvas
            style={{
              width: "100%",
              height: "100%",
            }}
            shadows
          >
            <>
              {currShape.component}
              <OrbitControls makeDefault />
            </>
          </Canvas>
        </Box>

        <Tabs
          value={tab}
          onChange={(e, v) => {
            setTab(v);
          }}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Shape Operations"
        >
          <Tab label="Surface Area" {...a11yProps(0)} />
          <Tab label="Volume" {...a11yProps(1)} />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tab}
          onChangeIndex={(index) => setTab(index)}
        >
          <TabPanel value={tab} index={0} dir={theme.direction}>
            <SurfaceArea shape={currShape} />
          </TabPanel>
          <TabPanel value={tab} index={1} dir={theme.direction}>
            <Volume shape={currShape} />
          </TabPanel>
        </SwipeableViews>
      </Container>
    </>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 3 }}>{children}</Box>}
    </div>
  );
}
