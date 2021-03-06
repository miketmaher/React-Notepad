import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNote, updateNote, getNotes } from '../../actions/noteActions';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import BlockStyleControls from '../editor/BlockStyleControls';
import InlineStyleControls from '../editor/InlineStyleControls';

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      editorState: EditorState.createEmpty(),
      isTitleChanged: false,
      isNoteChanged: false
    };
    this.focus = () => this.refs.editor.focus();
  }

  componentWillReceiveProps(nextProps) {
    const { id, title, note } = nextProps.note;
    const blocks = convertFromRaw(note);
    this.setState({
      id,
      title,
      editorState: EditorState.createWithContent(blocks),
      isTitleChanged: false,
      isNoteChanged: false
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getNote(id);
  }

  componentDidUpdate(prevProps) {
    const currentParam = this.props.match.params.id;
    if (currentParam !== prevProps.match.params.id) {
      this.props.getNote(currentParam);
      this.setState({
        isTitleChanged: false,
        isNoteChanged: false
      });
    }
  }

  focus = () => this.refs.editor.focus();

  onChange = editorState => {
    const { note } = this.props;
    const noteBlocks = note.note.blocks;
    const editorStateBlocks = convertToRaw(editorState.getCurrentContent())
      .blocks;
    if (
      !this.compareObjects(noteBlocks, editorStateBlocks) &&
      editorState.getCurrentContent().hasText()
    ) {
      this.setState({ isNoteChanged: true });
    } else {
      this.setState({ isNoteChanged: false });
    }
    this.setState({ editorState });
  };

  onInputChange = e => {
    const { note } = this.props;
    if (note.title === e.target.value || e.target.value === '') {
      this.setState({ isTitleChanged: false });
    } else {
      this.setState({ isTitleChanged: true });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };
  mapKeyToEditorCommand = e => {
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
  };
  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };
  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  compareObjects = (objA, objB) => {
    if (JSON.stringify(objA) !== JSON.stringify(objB)) {
      return false;
    } else {
      return true;
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, editorState } = this.state;
    //TODO: Validation
    const { id } = this.props.match.params;

    const updatedNote = {
      id,
      title,
      note: convertToRaw(editorState.getCurrentContent())
    };
    this.props.updateNote(updatedNote);

    this.setState({
      id: '',
      title: '',
      editorState: EditorState.createEmpty(),
      isTitleChanged: false,
      isNoteChanged: false
    });
    this.props.getNotes();
    this.props.history.push('/');
  };

  render() {
    const { title, editorState, isNoteChanged, isTitleChanged } = this.state;
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
          <button
            id="submit-button"
            type="submit"
            className="btn btn-primary"
            disabled={!isNoteChanged && !isTitleChanged}
          >
            <i className="fa fa-save fa-2x" />
          </button>
        </form>
      </React.Fragment>
    );
  }
}

EditNote.propTypes = {
  note: PropTypes.object.isRequired,
  getNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired
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

const actions = {
  getNote,
  updateNote,
  getNotes
};

export default connect(
  mapStateToProps,
  actions
)(EditNote);
