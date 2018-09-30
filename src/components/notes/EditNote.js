import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNote } from '../../actions/noteActions';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentState,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import BlockStyleControls from '../editor/BlockStyleControls';
import InlineStyleControls from '../editor/InlineStyleControls';

class EditNote extends Component {
  state = {
    id: '',
    title: '',
    note: {},
    editorState: EditorState.createEmpty()
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

  focus = () => this.refs.editor.focus();
  onChange = editorState => this.setState({ editorState });
  onInputChange = e => this.setState({ [e.target.name]: e.target.value });
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }
  render() {
    const { id, title, note, editorState } = this.state;
    // let className = 'RichEditor-editor';
    // let contentState = editorState.createWithContent(
    //   ContentState.createFromBlockArray(convertToRaw(note.blocks))
    // );
    // if (!contentState.hasText()) {
    //   if (
    //     contentState
    //       .getBlockMap()
    //       .first()
    //       .getType() !== 'unstyled'
    //   ) {
    //     className += ' RichEditor-hidePlaceholder';
    //   }
    // }
    return (
      <React.Fragment>
        <form>
          <input
            id="note-title"
            className="form-control"
            name="title"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={this.onInputChange}
          />
          {/* <div className="RichEditor-root">
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.mapKeyToEditorCommand}
                onChange={this.onChange}
                placeholder="Make a Note..."
                ref="editor"
                spellCheck={true}
              />
            </div>
          </div> */}
          <button type="submit" className="btn btn-primary">
            <i className="fa fa-save" />
          </button>
        </form>
      </React.Fragment>
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

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      getNote
    }
  )(EditNote)
);
