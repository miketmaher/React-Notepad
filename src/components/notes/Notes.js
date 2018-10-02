import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Note from './Note';
import { getNotes } from '../../actions/noteActions';

class Notes extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    const { notes } = this.props;
    return (
      <React.Fragment>
        <div className="navbar-expand-md">
          <div id="side-nav" className="collapse navbar-collapse">
            <ul className="list-group">
              {notes.map(note => (
                <Note key={note.id} note={note} />
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  getNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ notes: state.note.notes });

export default connect(
  mapStateToProps,
  { getNotes }
)(Notes);
