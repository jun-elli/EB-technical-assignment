import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const { REACT_APP_EB_TOKEN, REACT_APP_ORG_ID } = process.env;

  //retrieve events at render and set loging state
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const settings = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REACT_APP_EB_TOKEN}`,
        },
      };
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/organizations/${REACT_APP_ORG_ID}/events/?expand=venue`,
        settings
      );
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" justify-content-center">
      <header className="bg-primary text-white text-center pt-2 pb-2">
        <h1 className="display-1">EventBright</h1>
        <figcaption className="blockquote-footer text-white">
          Where amazing happens.
        </figcaption>
      </header>
      <div>
        <button
          className="btn btn-accent2 m-2"
          onClick={() => setIsOnline(true)}
        >
          Online events
        </button>
        <button
          className="btn btn-accent2 m-2"
          onClick={() => setIsOnline(false)}
        >
          Physical events
        </button>
      </div>

      <div className="d-flex justify-content-evenly flex-wrap w-75 mx-auto">
        {loading && <div>Loading...</div>}
        {events &&
          events
            .filter(
              (el) =>
                el.venue.address.city === "San Francisco" &&
                el.online_event === isOnline
            )
            .map((el) => {
              return (
                <div
                  className="card m-3"
                  style={{ width: 18 + "rem" }}
                  key={el.id}
                >
                  <img
                    src={el.logo.url}
                    className="card-img-top"
                    alt={el.name.text}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{el.name.text}</h5>
                    <p className="card-text">{el.description.text}</p>
                    <Link to={`/event/${el.id}`}>
                      <button className="btn btn-primary">See event</button>
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Landing;
