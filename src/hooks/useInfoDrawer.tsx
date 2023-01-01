import { ShapeInfo } from "../components/Shapes/ShapesData";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useCallback, useEffect } from "react";

export const useInfoDrawer = (props: {
  infoOpen: boolean;
  setInfoOpen: (open: boolean) => void;
  shape: ShapeInfo;
}) => {
  const { infoOpen, setInfoOpen, shape } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const [tab, setTab] = useState(0);

  const handleUserBackClick = useCallback(() => {
    history.pushState(null, document.title, location.href);

    setInfoOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handleUserBackClick, false);
    return () => {
      window.removeEventListener("popstate", handleUserBackClick, false);
    };
  }, [handleUserBackClick]);

  return {
    infoOpen,
    shape,
    theme,
    matches,
    tab,
    setTab,
    handleUserBackClick,
  };
};
