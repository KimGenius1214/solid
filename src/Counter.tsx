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

  const [theme, setTheme] = createSignal("light");

  return (
    <div class="flex flex-col items-center justify-center">
      <span>Count: {count()}</span>
      <span>Double: {double()}</span>
      <button type="button" onClick={increment}>
        Increment
      </button>
      <div style="color: red;">This is a red div</div>
      <div style={{ color: "red" }}>This is a red div</div>
      <div class={theme() === "light" ? "light-theme" : "dark-theme"}>
        This div's theme is determined dynamically!
      </div>
      <ThemedButton theme={theme()} />
    </div>
  );
}

function ThemedButton(props: { theme: string }) {
  return (
    <button class={props.theme}>
      {props.theme === "light" ? "Light Button" : "Dark Button"}
    </button>
  );
}

export default Counter;
