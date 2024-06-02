const collection: string[] = [];
let cursor = 0;

const useId = () => {
  const currentCursor = cursor;

  if (collection[currentCursor] === undefined) {
    collection[currentCursor] = crypto.randomUUID();
  }

  cursor++;

  return collection[currentCursor];
};

// TODO: consider removing this
export function resetUseIdCursor() {
  cursor = 0;
}

export default useId;
