import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Thing = {
  author: string;
  content: string;
  created: string;
  completed: string;
};

const token = "bb24b662-63f1-495c-a249-d7ca899d9e1a";

export const sortThings = (things: Thing[]): Thing[] => {
  const sortedThings = [...things].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );

  const doneThings = [];
  const todoThings = [];

  for (const thing of sortedThings) {
    if (thing.completed === "") {
      todoThings.push(thing);
    } else {
      doneThings.push(thing);
    }
  }

  const doneThingsSorted = [...doneThings].sort(
    (a, b) => new Date(b.completed).getTime() - new Date(a.completed).getTime(),
  );

  return [...todoThings, ...doneThingsSorted];
};

export const useThings = () => {
  return useQuery({
    queryKey: ["things"],
    queryFn: async () => {
      const res = await fetch("https://jsonbin.org/ewan-m/flat-stuffs/", {
        headers: { authorization: `token ${token}` },
      });

      return (await res.json()) as Thing[];
    },
  });
};

export const useAddThing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (thing: Thing) => {
      await fetch("https://jsonbin.org/ewan-m/flat-stuffs/", {
        headers: { authorization: `token ${token}` },
        method: "PATCH",
        body: JSON.stringify(thing),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
};

export const useMarkThingAsComplete = () => {
  const queryClient = useQueryClient();

  const things = useThings();

  return useMutation({
    mutationFn: async (thing: Thing) => {
      if (things.isSuccess) {
        const thingIndex = things.data.findIndex(
          (v) => v.created === thing.created,
        );

        await fetch(`https://jsonbin.org/ewan-m/flat-stuffs/${thingIndex}`, {
          headers: { authorization: `token ${token}` },
          method: "PATCH",
          body: JSON.stringify({
            ...thing,
            completed: new Date().toISOString(),
          }),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
};

export const useResetEverything = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await fetch("https://jsonbin.org/ewan-m/flat-stuffs/", {
        headers: { authorization: `token ${token}` },
        method: "POST",
        body: JSON.stringify([]),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
};
