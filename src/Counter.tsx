import {
  createSignal,
  createEffect,
  Show,
  Switch,
  Match,
  For,
  ErrorBoundary,
  onMount,
  onCleanup,
  createMemo,
  useContext,
  createContext,
  type JSX,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Portal } from "solid-js/web";

function Counter() {
  const [count, setCount] = createSignal(0);
  const [double, setDouble] = createSignal(0);
  const [message, setMessage] = createSignal("");

  const badMemo = createMemo(() => {
    if (count() > 10) {
      setMessage("Count is too high!"); //  side effect
    }
    return count() % 2 === 0;
  });
  console.log(badMemo()); // true
  const isEven = createMemo(() => count() % 2 === 0);

  console.log(isEven()); // true

  setCount(3);
  console.log(isEven()); // false

  const timer = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  const increment = () => setCount((prev) => prev + 1);

  console.log("Count:", count()); // ❌ not tracked - only runs once during initialization.

  createEffect(() => {
    console.log(count()); // ✅ will update whenever `count()` changes.
  });

  createEffect(() => {
    setDouble(count() * 2);
  });

  const [theme, setTheme] = createSignal("dark");
  const MyContext = createContext();

  const Provider = (props: { children: JSX.Element }) => (
    <MyContext.Provider value="new test">{props.children}</MyContext.Provider>
  );

  const Child = () => {
    const value = useContext(MyContext);

    return <span>{value as string}</span>;
  };

  const [store, setStore] = createStore({
    userCount: 3,
    users: [
      {
        id: 0,
        username: "felix909",
        location: "England",
        loggedIn: false,
      },
      {
        id: 1,
        username: "tracy634",
        location: "Canada",
        loggedIn: true,
      },
      {
        id: 2,
        username: "johny123",
        location: "India",
        loggedIn: true,
      },
    ],
  });

  setStore("users", (currentUsers) => [
    ...currentUsers,
    {
      id: 3,
      username: "michael584",
      location: "Nigeria",
      loggedIn: false,
    },
  ]);

  console.log(store.users[3].username);
  return (
    <Provider>
      {/* <div class="flex flex-col items-center justify-center">
        <span>Count: {count()}</span>
        <span>Double: {double()}</span>
        <span>Message: {message()}</span>
        <button type="button" onClick={increment}>
          Increment
        </button>
        <div style="color: red;">This is a red div</div>
        <div style={{ color: "red" }}>This is a red div</div>
        <div class={theme() === "light" ? "light-theme" : "dark-theme"}>
          This div's theme is determined dynamically!
        </div>
        <ThemedButton theme={theme()} />
        <Show when={theme() === "light"} fallback={<div>Loading...</div>}>
          <h1>Hi, I am {theme()}.</h1>
        </Show>
        <Show when={theme() === "light"}>
          <div>Loading...</div>
          <Show when={theme() === "dark"}>
            <div>Dark</div>
          </Show>
        </Show>
        <Switch>
          <Match when={theme() === "light"}>
            <p>Light</p>
          </Match>
          <Match when={theme() === "dark"}>
            <p>Dark</p>
          </Match>
        </Switch>
        <App />
      </div> */}
      <Child />
    </Provider>
  );
}

function ThemedButton(props: { theme: string }) {
  return (
    <button class={props.theme}>
      {props.theme === "light" ? "Light Button" : "Dark Button"}
    </button>
  );
}

const RedDiv = () => <div style="color: red">Red</div>;
const GreenDiv = () => <div style="color: green">Green</div>;
const BlueDiv = () => <div style="color: blue">Blue</div>;

const options = {
  red: RedDiv,
  green: GreenDiv,
  blue: BlueDiv,
};

function App() {
  const [selected, setSelected] = createSignal("red");
  const [count, setCount] = createSignal(0);

  createEffect(() => {
    console.log("Outer effect starts");
    createEffect(() => console.log("Inner effect"));
    console.log("Outer effect ends");
  });

  onMount(async () => {
    // will run only once, when the component is mounted
    const fetchedData = await fetch("https://example.com/data");
    console.log(fetchedData);
  });

  return (
    <>
      <select
        value={selected()}
        onInput={(e) => setSelected(e.currentTarget.value)}
      >
        <For each={Object.keys(options)}>
          {(color) => <option value={color}>{color}</option>}
        </For>
      </select>
      <Switch fallback={<BlueDiv />}>
        <Match when={selected() === "red"}>
          <RedDiv />
        </Match>
        <Match when={selected() === "green"}>
          <GreenDiv />
        </Match>
      </Switch>
      <Portal mount={document.querySelector("main") as Node}>
        <div class="popup">Popup</div>
      </Portal>
      <ErrorBoundary
        fallback={(error, reset) => (
          <div>
            <p>Something went wrong: {error.message}</p>
            <button onClick={reset}>Try Again</button>
          </div>
        )}
      >
        <div>Error Prone</div>
      </ErrorBoundary>
    </>
  );
}

export default Counter;
