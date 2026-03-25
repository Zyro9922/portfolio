import { Object3DNode } from "@react-three/fiber";
import { Points, PointsMaterial } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    points: Object3DNode<Points, typeof Points>;
    pointsMaterial: Object3DNode<PointsMaterial, typeof PointsMaterial>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      points: Record<string, unknown>;
      pointsMaterial: Record<string, unknown>;
      bufferGeometry: Record<string, unknown>;
      bufferAttribute: Record<string, unknown>;
      torusGeometry: Record<string, unknown>;
      meshBasicMaterial: Record<string, unknown>;
      ambientLight: Record<string, unknown>;
    }
  }
}

export {};
