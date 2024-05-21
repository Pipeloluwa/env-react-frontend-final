import React from 'react';
import { Html, useProgress } from '@react-three/drei'

export const Loading= () => {
  const { progress } = useProgress()
  return <Html center>
          <div className='bg-white py-2 px-4 rounded-2xl animate-bounce shadow shadow-black/90'>
            <h1 className='text-green-600 font-bold'>{progress.toFixed(0)}%  </h1>
          </div>
        </Html>
}