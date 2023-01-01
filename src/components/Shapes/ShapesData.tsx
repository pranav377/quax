import BoxShape from "./BoxShape";
import CylinderShape from "./CylinderShape";
import ConeShape from "./ConeShape";
import SphereShape from "./SphereShape";

export type ShapeInfo = {
  name: "Cube" | "Cuboid" | "Cylinder" | "Cone" | "Sphere";
  component: React.ReactNode;
  surfaceArea: (data: any) => number;
  volume: (data: any) => number;
  fields: Array<{
    field: string;
    label: string;
    for: "surfaceArea" | "volume" | "both";
    type: "number" | "type";
  }>;
};

const color = "#585858";

const ShapesData: Array<ShapeInfo> = [
  {
    name: "Cube",
    component: (
      <BoxShape length={1.5} breadth={1.5} height={1.5} color={color} />
    ),
    surfaceArea: (data: { s: number }) => {
      const { s } = data;
      return 6 * s ** 2;
    },
    volume: (data: { s: number }) => {
      const { s } = data;
      return s ** 3;
    },
    fields: [
      {
        field: "s",
        label: "Side length",
        for: "both",
        type: "number",
      },
    ],
  },
  {
    name: "Cuboid",
    component: <BoxShape length={1} breadth={3} height={1} color={color} />,
    surfaceArea: (data: { l: number; b: number; h: number }) => {
      const { l, b, h } = data;
      return 2 * (l * b + b * h + h * l);
    },
    volume: (data: { l: number; b: number; h: number }) => {
      const { l, b, h } = data;
      return l * b * h;
    },
    fields: [
      {
        field: "l",
        label: "Length",
        for: "both",
        type: "number",
      },
      {
        field: "b",
        label: "Breadth",
        for: "both",
        type: "number",
      },
      {
        field: "h",
        label: "Height",
        for: "both",
        type: "number",
      },
    ],
  },
  {
    name: "Cylinder",
    component: <CylinderShape radius={1} height={2} color={color} />,
    surfaceArea: (data: { r: number; h: number; type: "curved" | "total" }) => {
      const { r, h, type } = data;
      if (type === "curved") {
        return 2 * Math.PI * r * h;
      } else {
        return 2 * Math.PI * r * (r + h);
      }
    },
    volume: (data: { r: number; h: number }) => {
      const { r, h } = data;
      return Math.PI * r ** 2 * h;
    },
    fields: [
      {
        field: "type",
        label: "Type",
        for: "surfaceArea",
        type: "type",
      },
      {
        field: "r",
        label: "Radius",
        for: "both",
        type: "number",
      },
      {
        field: "h",
        label: "Height",
        for: "both",
        type: "number",
      },
    ],
  },
  {
    name: "Cone",
    component: <ConeShape radius={1} height={2} color={color} />,
    surfaceArea: (data: { r: number; h: number; type: "curved" | "total" }) => {
      const { r, h, type } = data;
      if (type === "curved") {
        return Math.PI * r * Math.sqrt(r ** 2 + h ** 2);
      } else {
        return Math.PI * r * (r + Math.sqrt(r ** 2 + h ** 2));
      }
    },
    volume: (data: { r: number; h: number }) => {
      const { r, h } = data;
      return (Math.PI * r ** 2 * h) / 3;
    },
    fields: [
      {
        field: "type",
        label: "Type",
        for: "surfaceArea",
        type: "type",
      },
      {
        field: "r",
        label: "Radius",
        for: "both",
        type: "number",
      },
      {
        field: "h",
        label: "Height",
        for: "both",
        type: "number",
      },
    ],
  },
  {
    name: "Sphere",
    component: <SphereShape radius={1} color={color} />,
    surfaceArea: (data: { r: number }) => {
      const { r } = data;
      return 4 * Math.PI * r ** 2;
    },
    volume: (data: { r: number }) => {
      const { r } = data;
      return (4 * Math.PI * r ** 3) / 3;
    },
    fields: [
      {
        field: "r",
        label: "Radius",
        for: "both",
        type: "number",
      },
    ],
  },
];

export default ShapesData;
