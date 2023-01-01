import * as THREE from "three";
import BaseShape from "./BaseShape";
import { memo } from "react";

export default memo(function ConeShape(props: {
  radius: number;
  height: number;
  color: string;
}) {
  const { radius, height, color } = props;

  const shapeObj = new THREE.ConeGeometry(radius, height, 32);

  return <BaseShape shapeObj={shapeObj} color={props.color} />;
});
