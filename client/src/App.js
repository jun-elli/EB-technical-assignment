import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Event from "./Components/Event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/event/:id" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
