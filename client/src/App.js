import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Event from "./Components/Event";
import Tickets from "./Components/Tickets";
import { useState } from "react";

function App() {
  const [event, setEvent] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/event/:id"
          element={<Event getEventToParent={setEvent} />}
        />
        <Route path="/event/:id/tickets" element={<Tickets event={event} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
