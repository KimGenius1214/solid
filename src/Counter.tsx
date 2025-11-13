import { createSignal, createEffect } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount((prev) => prev + 1);

  console.log("Count:", count()); // ❌ not tracked - only runs once during initialization.

  createEffect(() => {
    console.log(count()); // ✅ will update whenever `count()` changes.
  });

  return (
    <div>
      <span>Count: {count()}</span>{" "}
      {/* Only `count()` is updated when the button is clicked. */}
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
