import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React, { Suspense, useEffect, useState } from "react"
import './App.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

const App = () => {

  const [opt, setOpt] = useState({
   radius: 10,
   tube: 3,
   p: 2,
   q:  8,
   tubularSegments: 200,
   radialSegments: 20
  })
  

  useEffect(() => {
   
   gui
   .add(opt, 'radius')
   .min(5)
   .max(25)
   .onChange(() => setOpt(prev => ({...prev, radius: opt.radius})))

   gui
   .add(opt, 'tube')
   .min(2)
   .step(1)
   .max(8)
   .onChange(() => setOpt(prev => ({...prev, tube: opt.tube})))
 
   gui
   .add(opt, 'p')
   .min(2)
   .step(2)
   .max(16)
   .onChange(() => setOpt(prev => ({...prev, p: opt.p})))

   gui
   .add(opt, 'q')
   .step(2)
   .min(2)
   .max(8)
   .onChange(() => setOpt(prev => ({...prev, q: opt.q})))
   gui
   .add(opt, 'tubularSegments')
   .min(100)
   .max(700)
   .name('tube segments')
   .onChange(() => setOpt(prev => ({...prev, tubularSegments: opt.tubularSegments})))
   
  },[])

  return (
    <>
     <Canvas id="webgl">
       <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
         <mesh scale={0.1} rotation={[0, 0, Math.PI / 2]}>
          <torusKnotBufferGeometry 
          args={[opt.radius, opt.tube, opt.tubularSegments, opt.radialSegments, opt.p, opt.q]}/>
          <meshStandardMaterial color={'white'}/>
         </mesh>
         <Environment background>
             <mesh scale={100}>
               <sphereGeometry args={[1, 64, 64]} />
               <meshNormalMaterial side={THREE.BackSide}/>
             </mesh>
         </Environment>
       </Suspense>
      </Canvas>
    </>
  )
}

export default React.memo(App)
