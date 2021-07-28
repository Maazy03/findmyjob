import React, { useState, useEffect } from "react";
import {
  EditorState,
  convertFromHTML,
  convertToRaw,
  ContentState
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

function FormDraftJsEditor(props) {
  const [state, setState] = useState({
    editorState: EditorState.createEmpty()
  });
  // const [stateReset, setStateReset] = useState(true);

  useEffect(() => {
    const { editorStateMarkup } = props;
    if (editorStateMarkup) {
      const blocksFromHTML = convertFromHTML(editorStateMarkup);
      const newState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setState({ editorState: EditorState.createWithContent(newState) });
    }
  }, []);

  useEffect(() => {
    if (props.setData) {
      setState({ editorState: EditorState.createEmpty() });
      //   setStateReset(false);
    }
  }, []);

  function onEditorStateChange(editorState) {
    setState({ editorState });
    props.getData(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
      convertToRaw(editorState.getCurrentContent()).blocks[0].text
    );
  }

  return (
    <Editor
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      editorState={state.editorState}
      onEditorStateChange={onEditorStateChange}
      readOnly={props.readOnly && props.readOnly}
    />
  );
}

export default FormDraftJsEditor;
