import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Note extends Component {
  render() {
    const { id, title } = this.props.note;
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

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  detail: PropTypes.object
};

export default Note;
