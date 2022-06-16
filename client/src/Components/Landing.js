import { useEffect, useState } from "react";

const Landing = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_EB_TOKEN, REACT_APP_ORG_ID } = process.env;

  //retrieve events at render
  useEffect(() => {
    setLoading(true);
    fetchEvents();
    setLoading(false);
  }, []);

  const fetchEvents = async () => {
    try {
      const settings = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REACT_APP_EB_TOKEN}`,
        },
      };
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/organizations/${REACT_APP_ORG_ID}/events/`,
        settings
      );
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>EventBright</h1>
      <div>List of events</div>
    </div>
  );
};

export default Landing;
