export default function Logo() {
  return (
    <div className="text-center">
      <h1
        className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight"
        style={{
          fontSize: "clamp(4rem, 8vw, 8rem)",
        }}
      >
        GPI360
      </h1>
      <p
        className="font-bold leading-tight pb-2"
        style={{
          fontSize: "clamp(1.5rem, 2vw, 3rem)",
          textShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
        }}
      >
        Gestión de PYMES integral
      </p>
      <div className="inset-x-0 top-1/2 h-px bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75 m-auto"></div>

      <div className="text-sm">
        <p className="my-4 font-semibold text-xl">
          ¿Listo para dar el siguiente paso?
        </p>
        <p className="text-primary font-bold">(+54) 9 3442 64-4674</p>
        <p className="text-primary font-bold">(+54) 9 3548 41-2165</p>

        <p className="mt-4 text-muted-foreground text-sm">
          ¡Contáctanos y empieza ahora a transformar tu negocio!
        </p>
      </div>
    </div>
  );
}
