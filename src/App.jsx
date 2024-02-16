import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
// import "@mantine/dates/styles.css";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
