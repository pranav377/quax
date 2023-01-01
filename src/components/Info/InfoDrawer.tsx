import Drawer from "@mui/material/Drawer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ShapeInfo } from "../Shapes/ShapesData";
import SwipeableViews from "react-swipeable-views";
import Volume from "./Calculations/Volume";
import SurfaceArea from "./Calculations/SurfaceArea";
import { OrbitControls } from "../OrbitControls";
import { memo } from "react";
import { useInfoDrawer } from "../../hooks/useInfoDrawer";

export default memo(function InfoDrawer(props: {
  infoOpen: boolean;
  setInfoOpen: (open: boolean) => void;
  shape: ShapeInfo;
}) {
  const { infoOpen, shape, theme, matches, tab, setTab, handleUserBackClick } =
    useInfoDrawer(props);

  return (
    <Drawer
      anchor={"right"}
      open={infoOpen}
      onClose={() => handleUserBackClick()}
      PaperProps={{
        sx: { width: matches ? 500 : "100%" },
      }}
    >
      <>
        <Box
          role="presentation"
          sx={{
            p: 1,
          }}
        >
          <Button
            onClick={() => handleUserBackClick()}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>

          <Box sx={{ p: 2 }}>
            <Typography variant="h4">{shape.name}</Typography>

            <Box sx={{ width: "100%", height: "30vh" }}>
              <Canvas
                style={{
                  width: "100%",
                  height: "100%",
                }}
                shadows
              >
                <>
                  {shape.component}
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
                <SurfaceArea shape={shape} />
              </TabPanel>
              <TabPanel value={tab} index={1} dir={theme.direction}>
                <Volume shape={shape} />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Box>
      </>
    </Drawer>
  );
});

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
