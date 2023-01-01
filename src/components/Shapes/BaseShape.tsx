import { useFrame, ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function BaseShape(
  props: ThreeElements["mesh"] & {
    shapeObj: object;
    color: string;
  }
) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} castShadow />
      <mesh {...props} ref={mesh} scale={[1.5, 1.5, 1.5]} castShadow>
        <primitive object={props.shapeObj} attach={"geometry"} />
        <meshStandardMaterial color={props.color} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" opacity={0.3} />
      </mesh>
    </>
  );
}
