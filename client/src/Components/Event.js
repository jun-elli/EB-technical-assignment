import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import tokens and my user id from env

const Event = ({ getEventToParent }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_EB_TOKEN } = process.env;

  let { id } = useParams();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
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
        `https://www.eventbriteapi.com/v3/events/${id}/?expand=ticket_availability`,
        settings
      );
      const data = await response.json();
      setEvent(data);
      getEventToParent(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    //"2022-07-26T07:00:00" -- 2022-07-26 at 07:00:00
    let arr = date.split("T");
    let result = arr[0] + " at " + arr[1].slice(0, 5) + "h";
    return result;
  };

  return (
    <div>
      <header className="bg-primary text-white text-center pt-2 pb-2">
        <h1 className="display-1">EventBright</h1>
        <figcaption className="blockquote-footer text-white">
          Where amazing happens.
        </figcaption>
      </header>
      {loading && <div>Loading...</div>}
      {event && (
        <div className="card m-3 w-75 mx-auto">
          <div className="row">
            <div className="col-8">
              <img
                src={event.logo.url}
                className="card-img-top"
                alt={event.name.text}
              />
              <p className="card-text text-center fs-5 p-3">
                {event.description.text}
              </p>
            </div>
            <div className="col-md-3 card-body d-flex flex-column">
              <h3 className="card-title p-3 text-center">{event.name.text}</h3>
              <p className="card-text fw-light">
                Starts: {formatDate(event.start.local)}
              </p>
              <p className="card-text fw-light mb-auto">
                Ends: {formatDate(event.end.local)}
              </p>
              <p>
                Price:{" "}
                {event.is_free
                  ? "Free"
                  : event.ticket_availability.minimum_ticket_price.display +
                    " - " +
                    event.ticket_availability.maximum_ticket_price.display}{" "}
              </p>
              <Link
                to={`/event/${id}/tickets`}
                className="d-flex flex-column text-decoration-none"
              >
                <button className="btn btn-success">Tickets</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
