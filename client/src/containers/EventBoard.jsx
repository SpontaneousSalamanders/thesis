import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEvents } from '../actions/eventActions.jsx';
import { Divider, Segment, Button, Popup } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';


class EventBoard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getEvents(this.props.mentor.id);
  }

  handleClick(event) {
    axios.post('/attendEvent', event, {
      headers: { authorization: localStorage.getItem('token') }
    });
  }

  render() {
    return (
      <div style={{"height":750, "overflow":"auto"}}>
      {
        this.props.events.length > 0 ? (
        <ul className="media-list">
          {this.props.events.map((event, index)=>{
            return (
              <Segment>
              <li key={index} className="media">
                <div className="media-left">
                  <div
                    style={{"width": 50, "cursor":"pointer"}}
                    className="thumbnail"
                    >
                    <img className="media-object" src='https://d30y9cdsu7xlg0.cloudfront.net/png/89454-200.png' alt="..."/>
                  </div>
                </div>
                <div className="media-body">
                  <h5
                    style={{"cursor":"pointer"}}
                    className="media-heading">{event.title}</h5>
                  <p>
                    {event.location}
                    <br/>
                    {event.description}
                    <br/>
                    {moment(event.date).format('MMMM D YYYY')}
                    <br/>
                  </p>
                </div>
                <div className="media-right">
                  <Popup
                    trigger={<Button
                    style={{"float":"right"}}
                    onClick={() => this.handleClick(event)}
                    basic>Attend</Button>}
                    content={this.props.authenticated ? 'Added to your events!' : 'Please log in to save event'}
                    on="click"
                    hideOnScroll
                  />

                </div>
              </li>
              </Segment>
            )
          })}
        </ul>
        ) : (
        <div style={{"textAlign":"center", "marginTop":20}}>
        <p style={{"color":"#BCBCBC"}}>This mentor has no upcoming events.</p>
        </div>
        )
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    mentor: state.selectedMentor,
    events: state.events.eventData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getEvents: getEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventBoard);
