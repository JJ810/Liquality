import React, { useEffect, useRef, useState } from 'react'
import './App.scss'
import { getData } from './utils/api'
import { formatDate, formatEntry } from './utils/helper'
import { ResponseData } from './utils/types'

const App: React.FC = () => {
  const [data, setData] = useState<ResponseData[]>()
  const [updateRate, setUpdateRate] = useState<number>(-1)
  const interval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    getData().then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
      interval.current = null
    }
    if (updateRate > -1) {
      interval.current = setInterval(() => {
        getData().then((res) => setData(res.data))
      }, updateRate * 1000)
    }
  }, [updateRate])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUpdateRate(parseInt(e.target.value))

  return (
    <div className='container'>
      <div className='container__rate'>
        <label>Update Every: </label>
        <select onChange={handleChange}>
          <option value={-1}>Unset</option>
          <option value={5}>5 seconds</option>
          <option value={10}>10 seconds</option>
          <option value={15}>15 seconds</option>
        </select>
      </div>
      <div className='container__table'>
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
            {typeof data !== 'undefined' &&
              data.length > 0 &&
              data.map((d, i) => {
                const { from, to, rate, orderExpiresIn, status, max, min, createdAt, updatedAt, minConf } = d
                return <tr key={i}>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{rate}</td>
                  <td>{orderExpiresIn}</td>
                  <td>{status}</td>
                  <td>{formatEntry(max, from)}</td>
                  <td>{formatEntry(min, from)}</td>
                  <td>{formatDate(createdAt)}</td>
                  <td>{formatDate(updatedAt)}</td>
                  <td>{minConf}</td>
                </tr>
              }
              )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
