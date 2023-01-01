import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import ShapesData from "../Shapes/ShapesData";
import InfoCard from "./infoCard";

export default function ShapesInfo() {
  // doing this for closing drawer on back button click
  useEffect(() => {
    history.pushState(null, document.title, location.href);
  }, []);

  return (
    <>
      <Container sx={{ p: 4 }} maxWidth="md">
        <Grid container spacing={4} display="flex" alignItems={"center"}>
          {ShapesData.map((shape, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={6}>
              <InfoCard shape={shape} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
