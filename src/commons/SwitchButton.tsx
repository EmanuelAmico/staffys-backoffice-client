import React from "react";
export interface ISwitchButton {
  isSwitched?: boolean;
}
const SwitchButton: React.FC<ISwitchButton> = () => {
  // Debería agarrarme los estilos de este comon, pero no pasa nada :(

  return (
    <div className="bg-red-600">
      <h1>hola</h1>
    </div>
  );
};

export default SwitchButton;

//#90CAF9
//#2196F3
