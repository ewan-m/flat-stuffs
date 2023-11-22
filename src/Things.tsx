import { FC } from "react";
import {
  Thing,
  sortThings,
  useMarkThingAsComplete,
  useThings,
} from "./api/useData";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Ewan from "./ewan.jpg"
import Calum from "./calum.jpg";

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  } as const;

  const formattedDate = date.toLocaleString(undefined, options);
  return formattedDate;
};

export const ThingCard: FC<{ thing: Thing }> = ({ thing }) => {
  const markThingAsComplete = useMarkThingAsComplete();

  const [autoAnimate1] = useAutoAnimate();
  const [autoAnimate2] = useAutoAnimate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "1rem",
        marginTop: "1rem",
      }}
      ref={autoAnimate1}
    >
      <div
        ref={autoAnimate2}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {thing.author === "Ewan" && (
          <img
            style={{
              filter: thing.completed !== "" ? "grayscale(1)" : undefined,
            }}
            className="thing-image"
            src={Ewan}
          />
        )}
        {thing.author === "Calum" && (
          <img
            style={{
              filter: thing.completed !== "" ? "grayscale(1)" : undefined,
            }}
            className="thing-image"
            src={Calum}
          />
        )}
        {thing.completed !== "" && (
          <p
            style={{
              position: "absolute",
              margin: 0,
              width: "fit-content",
              height: "fit-content",
              background: "#ffffff66",
              color: "#167216",
              borderRadius: "0.5rem",
              padding: "0 0.25rem",
              backdropFilter: "blur(1px)",
              fontWeight: 600,
            }}
          >
            Done
          </p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <p style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          {thing.content}
        </p>
        <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
          <p style={{ margin: 0, fontWeight: 500, whiteSpace: "nowrap" }}>
            - {thing.author}
          </p>
          <p style={{ margin: 0, fontWeight: 300, whiteSpace: "nowrap" }}>
            {formatDate(thing.created)}
          </p>
        </div>
      </div>
      {thing.completed === "" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            markThingAsComplete.mutate(thing);
          }}
          style={{ margin: "0 0 0 auto" }}
        >
          Yes
        </button>
      )}
    </div>
  );
};

export const Things = () => {
  const things = useThings();

  return (
    things.status === "success" &&
    sortThings(things.data).map((thing) => (
      <ThingCard thing={thing} key={thing.created} />
    ))
  );
};
