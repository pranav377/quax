import * as THREE from "three";
import BaseShape from "./BaseShape";
import { memo } from "react";

export default memo(function SphereShape(props: {
  radius: number;
  color: string;
}) {
  const { radius, color } = props;

  const shapeObj = new THREE.SphereGeometry(radius, 32, 32);

  return <BaseShape shapeObj={shapeObj} color={color} />;
});
