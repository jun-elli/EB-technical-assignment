import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Event from "./Components/Event";
import Tickets from "./Components/Tickets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/event/:id/tickets" element={<Tickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
