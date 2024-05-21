import { useControls } from "leva";




export const AmbientLight = () => {
    const {brightness} = useControls({
      brightness: {
        label: 'Ambience Light',
        value: 4.0,
        min: 0.0,
        max: 5000.0,
        step: 0.1
      }
    });
  
  
    return (
      <ambientLight intensity={brightness}/>
    );
  }