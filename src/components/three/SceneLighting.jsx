export default function SceneLighting() {
  const isLight = true
  return (
    <>
      <ambientLight color={isLight ? 0x8899cc : 0x304080} intensity={isLight ? 0.8 : 0.4} />
      <directionalLight
        color={0xffffff} intensity={isLight ? 1.5 : 1.2}
        position={[3, 4, 3]} castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Cyan accent — left */}
      <pointLight color="#00B8E8" intensity={isLight ? 0.6 : 0.8} position={[-2, 1, 2]} />
      {/* Royal blue/purple fill — back */}
      <pointLight color={isLight ? "#2B3A9F" : "#7b5cfa"} intensity={isLight ? 0.4 : 0.5} position={[2, -1, -1]} />
    </>
  )
}
