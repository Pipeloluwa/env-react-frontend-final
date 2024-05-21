import { useControls } from "leva";




export const Point_Light = () => {
    const {brightness2} = useControls({
      brightness2: {
        label: 'Point Light',
        value: 2,
        min: 0.1,
        max: 50000.0,
        step: 0.1
      }
    });
  
  
    return (
      <pointLight color="#fff"  intensity={brightness2} position={[0, 800, 0]}/>
    );
  }