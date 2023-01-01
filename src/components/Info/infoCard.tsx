import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoDrawer from "./InfoDrawer";
import { ShapeInfo } from "../Shapes/ShapesData";
import { memo } from "react";

export default memo(function InfoCard(props: { shape: ShapeInfo }) {
  const { shape } = props;
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Box
          height={200}
          sx={{
            position: "relative",
          }}
        >
          <Canvas
            style={{
              width: "100%",
              height: "100%",
            }}
            shadows
          >
            {shape.component}
          </Canvas>
          <CardContent sx={{ position: "relative", zIndex: 1, top: -100 }}>
            <Typography variant="h5" component="div" textAlign={"center"}>
              {shape.name}
            </Typography>
            <Button size="medium" fullWidth onClick={() => setInfoOpen(true)}>
              Calculate
            </Button>
          </CardContent>
        </Box>
      </Card>

      <InfoDrawer infoOpen={infoOpen} setInfoOpen={setInfoOpen} shape={shape} />
    </>
  );
});
