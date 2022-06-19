import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Tickets = ({ event }) => {
  const [ticketsInfo, setTicketsInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_EB_TOKEN } = process.env;

  let { id } = useParams();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
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
        `https://www.eventbriteapi.com/v3/events/${id}/ticket_classes/`,
        settings
      );
      const data = await response.json();
      setTicketsInfo(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
            <div className="col-8 d-flex flex-column pe-0">
              <div className="card-header border-info">
                <h2>Title</h2>
                <p>Dates</p>
              </div>
              <div>
                <div>Ticket info 1</div>
                <div>Ticket info 1</div>
              </div>
            </div>
            <div className="col ps-0">
              {" "}
              <img
                src={event.logo.url}
                className="card-img-top"
                alt={event.name.text}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
