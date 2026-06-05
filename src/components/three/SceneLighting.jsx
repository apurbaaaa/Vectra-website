export default function SceneLighting() {
  return (
    <>
      <ambientLight color={0x304080} intensity={0.4} />
      <directionalLight
        color={0xffffff} intensity={1.2}
        position={[3, 4, 3]} castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Brand cyan rim light — left */}
      <pointLight color="#00c8ff" intensity={0.8} position={[-2, 1, 2]} />
      {/* Brand purple fill — back right */}
      <pointLight color="#7b5cfa" intensity={0.5} position={[2, -1, -1]} />
    </>
  )
}
