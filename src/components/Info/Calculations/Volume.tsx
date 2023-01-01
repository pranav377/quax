import { useState } from "react";
import { ShapeInfo } from "../../Shapes/ShapesData";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CalculateIcon from "@mui/icons-material/Calculate";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import MathJax from "better-react-mathjax/MathJax";

export default function Volume(props: { shape: ShapeInfo }) {
  const { shape } = props;
  const { register, handleSubmit } = useForm();
  const [volume, setVolume] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <MathJax hideUntilTypeset="every">{`$$ ${shape.volumeFormula} $$`}</MathJax>
      <Typography color="grey.500" variant="subtitle2" mb={1}>
        All measurements should be in the same unit
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          setVolume(0);
          setLoading(true);
          const newData: { [key: string]: number } = {};
          Object.keys(data).map((key) => {
            newData[key] = parseFloat(data[key]);
          });

          const volume = shape.volume(newData);

          return new Promise<void>((resolve) => {
            setTimeout(() => {
              setVolume(volume);
              setLoading(false);
              resolve();
            }, 1000);
          });
        })}
      >
        {shape.fields.map((field, idx) => {
          if (field.type === "number") {
            return (
              <TextField
                {...register(field.field)}
                key={idx}
                label={field.label}
                variant="outlined"
                fullWidth
                required
                type="number"
                inputProps={{
                  step: "any",
                }}
                sx={{
                  mb: 1,
                }}
              />
            );
          }
          return null;
        })}
        {loading ? (
          <LoadingButton
            loading
            variant="contained"
            sx={{
              mt: 1,
            }}
            fullWidth
          >
            Calculating...
          </LoadingButton>
        ) : (
          <Button
            startIcon={<CalculateIcon />}
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              mt: 1,
            }}
          >
            Calculate
          </Button>
        )}
      </form>

      {volume > 0 && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Volume: {volume} unit
          <sup>3</sup>
        </Typography>
      )}
    </>
  );
}
