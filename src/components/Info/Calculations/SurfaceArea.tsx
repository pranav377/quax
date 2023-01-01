import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShapeInfo } from "../../Shapes/ShapesData";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import CalculateIcon from "@mui/icons-material/Calculate";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Controller } from "react-hook-form";

export default function SurfaceArea(props: { shape: ShapeInfo }) {
  const { shape } = props;
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      type: "total",
    },
  });
  const [surfaceArea, setSurfaceArea] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Typography color="grey.500" variant="subtitle2" mb={1}>
        All measurements should be in the same unit
      </Typography>
      <form
        onSubmit={handleSubmit((data: { [key: string]: any }) => {
          setSurfaceArea(0);
          setLoading(true);
          const newData: { [key: string]: number } = {};
          Object.keys(data).map((key) => {
            if (key !== "type") {
              newData[key] = parseFloat(data[key]);
            } else {
              newData[key] = data[key];
            }
          });

          const volume = shape.surfaceArea(newData);

          return new Promise<void>((resolve) => {
            setTimeout(() => {
              setSurfaceArea(volume);
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
                key={idx}
                {...register(field.field as any)}
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
          } else if (field.type === "type") {
            return (
              <FormControl key={idx}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      row
                      aria-labelledby="surface-area-type-label"
                      {...field}
                    >
                      <FormControlLabel
                        value="total"
                        control={<Radio />}
                        label="Total"
                      />
                      <FormControlLabel
                        value="curved"
                        control={<Radio />}
                        label="Curved"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
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

      {surfaceArea > 0 && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Surface Area: {surfaceArea} unit
          <sup>2</sup>
        </Typography>
      )}
    </>
  );
}
