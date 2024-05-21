import React from 'react'

export const Loader_ = () => {
  return (
    <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
      <svg className="animate-spin h-10 w-10 bg-blue-500 mb-4" viewBox="0 0 24 24">
      </svg>
      Please wait...
  </div>
  );
}





// import React from 'react'
// import { Html } from '@react-three/drei'

// const Loader_ = () => {
//   return (
//     <Html>
//         <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
//             <svg className="animate-spin h-10 w-10 border-[6px] border-[#714E2C] border-t-[#714E2C] rounded-full mb-4" viewBox="0 0 24 24">
//             </svg>
//             Please wait...
//         </div>
//     </Html>
//   );
// }

// export default Loader_;