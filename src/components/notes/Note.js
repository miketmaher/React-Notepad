import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Note extends Component {
  render() {
    const { id, title } = this.props.note;
    return (
      <React.Fragment>
        <Link to={`/note/edit/${id}`}>
          <li className="list-group-item">
            <h5>
              {title} <i className="fa fa-chevron-right" />
            </h5>
          </li>
        </Link>
      </React.Fragment>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;
