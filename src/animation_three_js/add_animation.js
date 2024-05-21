import { Html, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
// import background from './assets/images/background2.jpg';
import { ModelAnimation } from "./animation_components/model_animation";
import { AmbientLight } from "./animation_components/ambient_light";
import { Point_Light } from "./animation_components/point_light";
import { Loading } from "./loading";
import { Leva, useControls } from "leva";

import "../index.css";
import PapicControls from "./papic_controls";
import { keep_bg_color } from "../api/papic_controls_variables";





export const AddAnimation= (props) => {
  const canvasRef= useRef();

  const {bg_color} = useControls({
    bg_color: {
      value: "gray",
      label: "Background"
    }
  });


  return (
    // <div style={{backgroundImage: `url(${background})`}} className="h-screen">
  // <div className="h-full w-full" style={{background:keep_bg_color[0] }}>

  <div className="h-full w-full" style={{background:bg_color }}>
    
    {/* <div >
      <Leva />
    </div> */}


    <Leva  />

    {/* <PapicControls className= "fixed"/> */}

    <Canvas ref={canvasRef} camera={{fov:70, position: [0, 15, 55]}} className="h-full">

      <Suspense fallback={<Loading />}>
        {/* <camera /> */}
        <AmbientLight />
        <Point_Light/>
        <ModelAnimation props= {props} canvasRef= {canvasRef}/>
        <OrbitControls />

      </Suspense>
    </Canvas>
  </div>

  );
}

