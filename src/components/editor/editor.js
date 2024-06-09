import React from "react";
import RichTextEditor from "react-rte";
import editorStyle from './editor.module.css'

function Editor({ value, onChange }) {
    
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      toolbarClassName="demo-toolbar"
      editorClassName={editorStyle.editor}
    />
  );
}

export default Editor;
