import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Controller, { Select } from 'react-bootstrap/Controller'
import messages from '../AutoDismissAlert/messages'

const WellnessEventCreate = props => {
  const [wellnessEvent, setWellnessEvent] = useState({
    date: '',
    startTime: '',
    endTime: '',
    eventType: '',
    location: ''
  })
  // const [createdWellnessId, setCreatedWellnessId] = useState(null)

  const handleInputChange = event => {
    console.log('handleInputChange ', event)
    event.persist()
    setWellnessEvent(prevWellnessEvent => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedWellnessEvent = Object.assign({}, prevWellnessEvent, updatedField)
      return editedWellnessEvent
    })
  }

  const handleSubmit = event => {
    console.log('handleSubmit ', event)
    event.preventDefault()
    const { msgAlert, user } = props
    axios({
      method: 'POST',
      url: `${apiUrl}/wellnessEvents`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: { wellnessEvent: wellnessEvent }
    })
      .then(() => msgAlert({
        heading: 'Event Create Succes',
        message: messages.wellnessCreateSuccess,
        variant: 'Success'
      }))
      .then(res => {
        setWellnessEvent({
          wellnessEvent: {
            date: '',
            startTime: '',
            endTime: '',
            eventType: '',
            location: ''
          }
        })
      })
      .then(() => {
        return <Redirect to={'/wellnessEvents'} />
      })
      .catch(console.error)
  }

  // if (wellnessEvent) {
  //   return <Redirect to={'/'} />
  // }

  return (
    <div className="row wellness-event-create">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h1>Schedule A Wellness Event</h1>
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
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default WellnessEventCreate
