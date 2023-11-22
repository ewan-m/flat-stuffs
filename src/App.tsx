import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./App.css";
import { NewThing } from "./NewThing";
import { Things } from "./Things";
import { useResetEverything } from "./api/useData";

function App() {
  const [autoAnimate] = useAutoAnimate();
  const resetEverything = useResetEverything();

  return (
    <>
      <h1 style={{ margin: "0 0 2rem" }}>🏠 Flat stuffs</h1>
      <NewThing />
      <div ref={autoAnimate}>
        <Things />
      </div>

      <footer style={{ margin: "auto 0 0 0", paddingTop: "3rem" }}>
        © 2023 Interslice Tech.{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            resetEverything.mutate();
          }}
        >
          Reset everything
        </button>
      </footer>
    </>
  );
}

export default App;
