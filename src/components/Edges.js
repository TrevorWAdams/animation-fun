import * as THREE from 'three'
import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, OrbitControls } from '@react-three/drei'

function Model() {
  const { nodes } = useGLTF('/headless.glb')
  const edges = useMemo(() => new THREE.EdgesGeometry(nodes.Cube.geometry, 15), [nodes])
  return (
    <group dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial transparent />
      </mesh>
      <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  )
}

export default function Edges() {
  return (
    <div className="edges">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault dampingFactor={0.3} />
      </Canvas>
    </div>
  )
}
