/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import "solid-devtools";
import { Router, Route } from "@solidjs/router";

import App from "./App";
import { lazy } from "solid-js";

const Counter = lazy(() => import("./Counter"));
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

const Home = () => <h1>Home Page</h1>;

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/counter/:id" component={Counter} />
    </Router>
  ),
  root!
);
