import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Note extends Component {
  render() {
    const { id, title } = this.props.note;
    return (
      <React.Fragment>
        <NavLink activeClassName="active" to={`/note/edit/${id}`}>
          <li className="list-group-item">
            <h5>
              {title} <i className="fa fa-chevron-right" />
            </h5>
          </li>
        </NavLink>
      </React.Fragment>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  detail: PropTypes.object
};

export default Note;
