import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNote } from '../../actions/noteActions';

class EditNote extends Component {
  state = {
    id: '',
    title: '',
    note: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { id, title, note } = nextProps.note;
    this.setState({
      id,
      title,
      note
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getNote(id);
  }
  render() {
    const { id, title, note } = this.state;
    return (
      <div>
        <span>id = {id}</span>
        <span>title = {title}</span>
        <div>note = {note.toString()}</div>
      </div>
    );
  }
}

EditNote.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string
};

const mapStateToProps = state => ({
  note: state.note.note
});

export default connect(
  mapStateToProps,
  {
    getNote
  }
)(EditNote);
