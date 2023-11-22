import { useState } from "react";
import { useAddThing } from "./api/useData";

export const NewThing = () => {
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState("Calum");

  const addThing = useAddThing();

  return (
    <form
      className="new-thing-container"
      onSubmit={(e) => {
        e.preventDefault();
        if (value !== "") {
          addThing.mutate({
            author,
            content: value,
            created: new Date().toISOString(),
            completed: "",
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
