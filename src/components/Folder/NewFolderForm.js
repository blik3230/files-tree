import React, { useCallback, useRef, useEffect } from "react";
import IconButton from "../IconButton/IconButton";

function NewFolderForm({ value, onApply, onCancel, onChangeValue }) {
  const inputRef = useRef(null);
  const handleChangeValue = useCallback(e => onChangeValue(e.target.value), [
    onChangeValue
  ]);
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onApply();
    },
    [onApply]
  );

  useEffect(() => inputRef.current.focus(), []);

  return (
    <form className="folder__new-node" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="folder__new-node-field"
        value={value}
        onChange={handleChangeValue}
      />
      <div className="folder__new-node-actions">
        <div className="folder__new-node-wrap-action">
          <IconButton onClick={onCancel} icon="cancel" />
        </div>
        <div className="folder__new-node-wrap-action">
          <IconButton onClick={onApply} icon="apply" />
        </div>
      </div>
    </form>
  );
}

export default NewFolderForm;
