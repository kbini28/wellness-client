import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const WellnessEventIndex = props => {
  const [wellnessEvents, setWellnessEvents] = useState(null)

  useEffect(() => {
    const { user, msgAlert } = props
    axios({
      method: 'GET',
      url: `${apiUrl}/wellnessEvents`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(response => {
        // console.log('index axios', response)
        setWellnessEvents(response.data.wellnessEvents)
      })
      .then(() => msgAlert({
        heading: 'Event Show Success',
        message: messages.wellnessIndexSuccess,
        variant: 'Success'
      }))
      .catch(console.error)
  }, [])

  let jsx
  // if the API has not responded yet
  if (wellnessEvents === null) {
    jsx = <p>Loading...</p>

  // if the API responds with no events
  } else if (wellnessEvents.length === 0) {
    jsx = <p>No wellness events created, yet. Please add an event!</p>
  // if the API responds with events
  // wellnessEvents.sort will place the events in order from most recent to furthest away
  // then .map will display all events on the page (in the sorted order)
  } else {
    // console.log('here is where I log wellnessEvents', wellnessEvents)
    jsx = (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5 wellness-event-index">
          <ul>
            {wellnessEvents.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.startTime > b.startTime) ? 1 : -1) : -1).map(wellnessEvent => {
              return (
                <li key={wellnessEvent._id}>
                  <h3>Practicing wellness by: {wellnessEvent.eventType}</h3>
                  <h4>When? {wellnessEvent.date}</h4>
                  <h4>Start: {wellnessEvent.startTime}</h4>
                  <h4>End: {wellnessEvent.endTime}</h4>
                  <h4>Where? {wellnessEvent.location}</h4>
                  <Link to={`/wellnessEvents/${wellnessEvent._id}`}>
                    <button className="btn">See More</button>
                  </Link>
                  <Link to={`/wellnessEvents/${wellnessEvent._id}/update`}>
                    <button className="btn">Update Event</button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="wellness-event-index">
      <h2>All Wellness Events:</h2>
      {jsx}
    </div>
  )
}

export default WellnessEventIndex
