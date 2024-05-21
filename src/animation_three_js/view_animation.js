import { Html, Loader, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
// import background from './assets/images/background2.jpg';
import { AmbientLight } from "./animation_components/ambient_light";
import { ModelViewAnimation } from "./animation_components/model_animation_view";
import { Loader_ } from "./loader";
import { Color, PointLight } from "three";
import { Point_Light } from "./animation_components/point_light";
import { Leva, useControls } from "leva";
import { Loading } from "./loading";
import * as THREE from "three";





export const ViewAnimation= (props) => {
  const canvasRef= useRef();
  

  const {bg_color} = useControls({
    bg_color: "gray"
  });


  return (
    // <div style={{backgroundImage: `url(${background})`}} className="h-screen">
  <div className="h-full w-full" style={{background:bg_color }}>

    <Canvas ref={canvasRef} camera={{fov:70, position: [0, 15, 55]}}>
    {/* <Canvas camera= {fov.value}> scene={{background: new THREE.Color(bg_color)}}*/}
      <Suspense fallback={<Loading />}>

        <AmbientLight />
        <Point_Light/>
        <ModelViewAnimation props= {props} canvasRef= {canvasRef}/>
        <OrbitControls />

      </Suspense>
    </Canvas>

  </div>


  );
}

