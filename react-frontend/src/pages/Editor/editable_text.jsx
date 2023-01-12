import React from "react";
import {Editable_Text_Input} from "./editable_text_input";
import {Resizable_Text} from "./resizeable_text"

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function Editable_Text ({
  x,
  y,
  isEditing,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onChange,
  onResize,
  text,
  width,
  height
}) {
  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      onToggleEdit(e);
    }
  }

  function handleTextChange (e) {
    onChange(e.currentTarget.value);
  }

  if (isEditing) {
    return (
      <Editable_Text_Input
        x={x}
        y={y}
        width={width}
        height={height}
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleEscapeKeys}
        draggable={true}
      />
    );
  }
  return (
    <Resizable_Text
      x={x}
      y={y}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onDoubleClick={onToggleEdit}
      onResize={onResize}
      text={text}
      width={width}
      draggable={true}
    />
  );
}
