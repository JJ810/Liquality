import React, { useEffect, useState } from "react";
import "./App.scss";
import { getData } from "./utils/api";
import { formatDate } from "./utils/helper";
import { ResponseData } from "./utils/types";

let interval: NodeJS.Timeout | null;

function App() {
  const [data, setData] = useState<ResponseData[]>();
  const [updateRate, setUpdateRate] = useState<number>(-1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    if (updateRate > -1) {
      interval = setInterval(() => {
        fetchData();
      }, updateRate * 1000);
    }
  }, [updateRate]);

  const fetchData = () =>
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUpdateRate(parseInt(e.target.value));

  return (
    <div className="container">
      <div className="container__rate">
        <label>Update Every: </label>
        <select onChange={handleChange}>
          <option value={-1}>Unset</option>
          <option value={5}>5 seconds</option>
          <option value={10}>10 seconds</option>
          <option value={15}>15 seconds</option>
        </select>
      </div>
      <div className="container__table">
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Rate</th>
              <th>Order Expires In</th>
              <th>Status</th>
              <th>Max</th>
              <th>Min</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>MinConf</th>
            </tr>
          </thead>
          <tbody>
            {typeof data !== "undefined" &&
              data.length > 0 &&
              data.map((d, i) => (
                <tr key={i}>
                  <td>{d.from}</td>
                  <td>{d.to}</td>
                  <td>{d.rate}</td>
                  <td>{d.orderExpiresIn}</td>
                  <td>{d.status}</td>
                  <td>{d.max}</td>
                  <td>{d.min}</td>
                  <td>{formatDate(d.createdAt)}</td>
                  <td>{formatDate(d.updatedAt)}</td>
                  <td>{d.minConf}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
