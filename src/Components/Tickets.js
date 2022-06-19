import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Tickets = () => {
  const [ticketsInfo, setTicketsInfo] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_EB_TOKEN } = process.env;

  let { id } = useParams();

  useEffect(() => {
    fetchEvent();
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
      setTicketsInfo(data.ticket_classes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
      {event && ticketsInfo && (
        <div className="card m-3 w-75 mx-auto">
          <div className="row">
            <div className="col-8 d-flex flex-column pe-0 card-header text-center pt-4">
              <h2>{event.name.text}</h2>
              <p>
                {formatDate(event.start.local) +
                  " - " +
                  formatDate(event.end.local)}
              </p>
            </div>
            <div className="col ps-0">
              <img
                src={event.logo.url}
                className="card-img-top"
                alt={event.name.text}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-8 d-flex flex-column pe-0">
              {ticketsInfo
                .filter((el) => el.free)
                .map((el) => {
                  return (
                    <div className="row m-0 bg-light pt-1 ps-3 m-3" key={el.id}>
                      <div className="col ">
                        <p className="fw-bold pt-2">{el.display_name}</p>
                        <p className="ps-2">Free</p>
                      </div>
                      <div className="col-4 pt-3">
                        {el.quantity_sold === el.quantity_total
                          ? "SOLD OUT"
                          : "Available: " +
                            el.quantity_sold +
                            " / " +
                            el.quantity_total}
                      </div>
                    </div>
                  );
                })}
              {ticketsInfo
                .filter((el) => el.cost)
                .sort((a, b) => {
                  return a.cost.value - b.cost.value;
                })
                .map((el) => {
                  return (
                    <div className="row m-0 bg-light pt-1 ps-3 m-3" key={el.id}>
                      <div className="col ">
                        <p className="fw-bold pt-2">{el.display_name}</p>
                        <p className="ps-2">{el.cost.display}</p>
                      </div>
                      <div className="col-4 pt-3">
                        {el.quantity_sold === el.quantity_total
                          ? "SOLD OUT"
                          : "Available: " +
                            el.quantity_sold +
                            " / " +
                            el.quantity_total}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="col ps-0">
              <p className="pt-4 ps-2 fs-5">{event.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
