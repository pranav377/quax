import * as THREE from "three";
import BaseShape from "./BaseShape";
import { memo } from "react";

export default memo(function CylinderShape(props: {
  radius: number;
  height: number;
  color: string;
}) {
  const { radius, height, color } = props;

  const shapeObj = new THREE.CylinderGeometry(radius, radius, height, 32);

  return <BaseShape shapeObj={shapeObj} color={color} />;
});
