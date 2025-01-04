import React from "react";

import { InputText } from "@/shared/InputText";
import { InputTextMini } from "@/shared/InputTextMini";
import {
  ButtonAdd,
  ButtonCancel,
  ButtonDone,
  ButtonEdit,
  ButtonTrash,
} from "@/shared/Buttons";

function App() {
  return (
    <div className="App">
      <InputText />
      <InputTextMini />
      <ButtonEdit onClick={() => console.log("click")} />
      <ButtonAdd onClick={() => console.log("click")} />
      <ButtonCancel onClick={() => console.log("click")} />
      <ButtonTrash onClick={() => console.log("click")} />
      <ButtonDone onClick={() => console.log("click")} />
    </div>
  );
}

export default App;
