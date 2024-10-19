import React from "react";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className={"text-9xl text-white font-semibold drop-shadow"}>404</div>
      <div className={"text-4xl text-white font-semibold drop-shadow"}>
        Página no encontrada
      </div>
    </div>
  );
}
