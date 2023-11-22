import { useRef, useState } from "react";
import { useAddThing } from "./api/useData";
import music from "./skuffle.mp3";

export const NewThing = () => {
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState("Calum");

  const addThing = useAddThing();

  const audio = useRef<HTMLAudioElement | null>(null);

  return (
    <form
      className="new-thing-container"
      onSubmit={(e) => {
        e.preventDefault();
        if (value !== "" && addThing.status !== "pending") {
          addThing
            .mutateAsync({
              author,
              content: value,
              created: new Date().toISOString(),
              completed: "",
            })
            .then(() => {
              setValue("");
            });
        }
      }}
    >
      <textarea
        className="new-thing-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={() => {
          audio.current = new Audio(music);

          audio.current.play();
        }}
        onBlur={() => {
          if (audio.current) {
            audio.current.pause();
            audio.current.currentTime = 0;
          }
        }}
      />
      <div className="new-thing-buttons">
        <select
          value={author}
          onChange={(e) => {
            e.preventDefault();
            setAuthor(e.target.value);
          }}
        >
          <option>Calum</option>
          <option>Ewan</option>
        </select>
        <button>Add</button>
      </div>
    </form>
  );
};
