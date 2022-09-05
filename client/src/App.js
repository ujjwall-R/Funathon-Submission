import "./App.css";
import SearchPage from "./SearchPage/SearchPage";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <SearchPage></SearchPage>
    </div>
  );
}

export default App;
