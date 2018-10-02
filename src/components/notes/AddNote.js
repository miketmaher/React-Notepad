import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNote } from '../../actions/noteActions';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw
} from 'draft-js';
import BlockStyleControls from '../editor/BlockStyleControls';
import InlineStyleControls from '../editor/InlineStyleControls';

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
      isEmpty: true
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = this._onChange.bind(this);
    this.onInputChange = this._onInputChange.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  focus = () => this.refs.editor.focus();

  _onChange = editorState => {
    const { title } = this.state;
    this.setState({ editorState });
    if (editorState.getCurrentContent().hasText() && title !== '') {
      this.setState({ isEmpty: false });
    } else {
      this.setState({ isEmpty: true });
    }
  };

  _onInputChange = e => {
    const { editorState } = this.state;
    this.setState({ [e.target.name]: e.target.value });
    if (editorState.getCurrentContent().hasText() && e.target.value !== '') {
      this.setState({ isEmpty: false });
    } else {
      this.setState({ isEmpty: true });
    }
  };

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
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
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, editorState } = this.state;
    const newNote = {
      title,
      note: convertToRaw(editorState.getCurrentContent()).blocks
    };
    this.props.addNote(newNote);

    this.setState({
      title: '',
      editorState: EditorState.createEmpty(),
      isEmpty: true
    });
  };

  render() {
    const { title, editorState, isEmpty } = this.state;
    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input
            id="note-title"
            className="form-control"
            name="title"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={this.onInputChange}
          />
          <div className="RichEditor-root">
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
          </div>
          <div />
          <button
            id="submit-button"
            type="submit"
            className="btn btn-primary"
            disabled={isEmpty}
          >
            <i className="fa fa-save fa-2x" />
          </button>
        </form>
      </React.Fragment>
    );
  }
}

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

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired
};

export default connect(
  null,
  { addNote }
)(AddNote);
