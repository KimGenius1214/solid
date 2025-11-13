import { createSignal, createEffect } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);
  const [double, setDouble] = createSignal(0);

  const increment = () => setCount((prev) => prev + 1);

  console.log("Count:", count()); // ❌ not tracked - only runs once during initialization.

  createEffect(() => {
    console.log(count()); // ✅ will update whenever `count()` changes.
  });

  createEffect(() => {
    setDouble(count() * 2);
  });

  return (
    <div class="flex flex-col items-center justify-center">
      <span>Count: {count()}</span>
      <span>Double: {double()}</span>
      <button type="button" onClick={increment}>
        Increment
      </button>
      <div style="color: red;">This is a red div</div>
      <div style={{ color: "red" }}>This is a red div</div>
    </div>
  );
}

export default Counter;
