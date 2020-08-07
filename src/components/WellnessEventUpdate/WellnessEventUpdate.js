import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

const WellnessEventUpdate = props => {
  const [wellnessEvent, setWellnessEvent] = useState({
    date: '',
    startTime: '',
    endTime: '',
    eventType: '',
    location: ''
  })
  const [updated, setUpdated] = useState(false)
  const id = props.match.params.id

  useEffect(() => {
    const { user } = props
    axios({
      method: 'GET',
      url: `${apiUrl}/wellnessEvents/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setWellnessEvent({ wellnessEvent: res.data.wellnessEvent }))
      .catch(console.error)
  }, [])

  const handleInputChange = event => {
    event.persist()
    setWellnessEvent(prevEvent => {
      const updateField = { [event.target.name]: event.target.value }
      const editedEvent = Object.assign({}, prevEvent, updateField)
      return editedEvent
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const id = props.match.params.id
    const { user, msgAlert } = props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/wellnessEvents/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: { wellnessEvent: wellnessEvent }
    })
      .then(res => {
        setWellnessEvent({ wellnessEvent: res.data.wellnessEvent })
        setUpdated(true)
      })
      .then(() => msgAlert({
        heading: 'Event Update Success',
        message: messages.wellnessUpdateSuccess,
        variant: 'Success'
      }))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/wellnessEvents/${id}`} />
  }
  // add a cancel button to the events

  return (
    <div className="row wellness-event-update">
      <Link to={`/wellnessEvents/${wellnessEvent._id}`}>
        <button className="btn go-back">Go Back</button>
      </Link>
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h1>Update Your Event</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="date">
            <Form.Label>Pick A Date</Form.Label>
            <Form.Control
              required
              type="date"
              name="date"
              value={setWellnessEvent.date}
              placeholder="Date"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              required
              type="time"
              step='minute: 5'
              name="startTime"
              value={setWellnessEvent.startTime}
              placeholder="Start Time"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              required
              type="time"
              step={{ minute: 5 }}
              name="endTime"
              value={setWellnessEvent.endTime}
              placeholder="12:00 pm"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="eventType">
            <Form.Label>Type of Wellness Event</Form.Label>
            <Form.Control
              type="text"
              name="eventType"
              value={setWellnessEvent.eventType}
              placeholder="ex: take a walk"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location (optional)</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={setWellnessEvent.location}
              placeholder="ex: the park"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            className="btn"
            variant="primary"
            type="submit"
          >
            Update
          </Button>
          <Link to={`/wellnessEvents/${wellnessEvent._id}`}>
            <button className="btn">Cancel</button>
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default WellnessEventUpdate
