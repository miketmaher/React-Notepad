import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Note extends Component {
  render() {
    return (
      <React.Fragment>
        <h5>{title}</h5>
        <Link to={`note/edit/${id}`}>
          <i className="fa fa-chevron-right" />
        </Link>
      </React.Fragment>
    );
  }
}

export default Note;
