import BaseShape from "./BaseShape";
import * as THREE from "three";
import { memo } from "react";

/*
length -> depth
breadth -> width
height -> height
 */

export default memo(function BoxShape(props: {
  length: number;
  breadth: number;
  height: number;
  color: string;
}) {
  const { length: depth, breadth: width, height, color } = props;

  const shapeObj = new THREE.BoxGeometry(width, height, depth);

  return <BaseShape shapeObj={shapeObj} color={props.color} />;
});
