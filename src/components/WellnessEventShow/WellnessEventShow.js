import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, Redirect } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'

const WellnessEventShow = props => {
  const [wellnessEvent, setWellnessEvent] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    console.log('event show ', props.match)
    const id = props.match.params.id
    const { user } = props
    axios({
      method: 'GET',
      url: `${apiUrl}/wellnessEvents/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setWellnessEvent(res.data.wellnessEvent))
      .catch(console.error)
  }, [])

  // useEffect(() => {
  //   console.log(wellnessEvent)
  // }, [wellnessEvent])

  const deleteWellnessEvent = () => {
    const id = props.match.params.id
    const { msgAlert, user } = props
    axios({
      method: 'DELETE',
      url: `${apiUrl}/wellnessEvents/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Event Delete Success',
        message: 'Message Success',
        variant: 'Success'
      }))
      .then(res => setDeleted({ deleted: true }))
      .catch(() => msgAlert({
        heading: 'Event Delete Failure',
        message: 'Message Failure',
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  if (deleted === true) {
    return <Redirect to='/wellnessEvents' />
  }

  let jsx
  // if the API has not responded yet
  if (wellnessEvent === null) {
    jsx = <p>Loading...</p>
  // after API responds
  } else {
    jsx = (
      <div className="row wellness-event-show">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <section>
            <h3>Practicing wellness with: {wellnessEvent.eventType}</h3>
            <h4>When? {wellnessEvent.date}</h4>
            <h4>Start: {wellnessEvent.startTime}</h4>
            <h4>End: {wellnessEvent.endTime}</h4>
            <h4>Where? {wellnessEvent.location}</h4>
            <Link to={`/wellnessEvents/${wellnessEvent._id}/update`}>
              <button className="btn">Update Event</button>
            </Link>
            <button className="btn" onClick={deleteWellnessEvent}>Delete Event</button>
            <Link to={'/wellnessEvents'}>
              <button className="btn go-back">Go Back</button>
            </Link>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="wellness-event-show">
      <h2>Here is your scheduled event:</h2>
      {jsx}
    </div>
  )
}

export default WellnessEventShow
