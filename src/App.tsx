import { A } from "@solidjs/router";
import type { JSX } from "solid-js";

const App = (props: { children?: JSX.Element }) => (
  <>
    <nav style={{ padding: "20px", background: "#f0f0f0" }}>
      <A href="/" style={{ "margin-right": "20px" }}>
        Home
      </A>
      <A href="/counter">Counter</A>
    </nav>
    <h1>Site Title</h1>
    <main style={{ padding: "20px" }}>{props.children}</main>
  </>
);

export default App;
