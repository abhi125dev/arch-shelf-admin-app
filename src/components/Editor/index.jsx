import React from "react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// import { CKEditor } from "ckeditor4-react";

import CKEditor from "@ckeditor/ckeditor5-react";
import CKEditorConfig from "../../config/appConfig";

const Editor = ({ feedId, feedDetail, editorBody, setEditorBody }) => {
  return (
    <div className="text-gray-800 rounded">
      <CKEditor
        style={{ border: 2 }}
        onInit={(editor) => {
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
        }}
        onChange={(event, editor) => {
          const editorData = editor.getData();
          setEditorBody(editorData);
        }}
        editor={DecoupledEditor}
        data={feedId ? feedDetail : editorBody}
        config={
          CKEditorConfig.editor &&
          CKEditorConfig.editor.toolbarType &&
          CKEditorConfig.editor.toolbarType.notes
        }
      />
      {/* <CKEditor
        type="classic"
        onChange={(data) => {
          const editorData = data.editor.getData();
          setEditorBody(editorData);
        }}
        initData={`<p>${feedId ? feedDetail : ""}</p>`}
      /> */}
    </div>
  );
};

export default Editor;
