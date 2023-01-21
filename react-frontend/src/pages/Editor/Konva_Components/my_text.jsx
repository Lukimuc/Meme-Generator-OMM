import React, { useState } from "react";
import { Text, Transformer } from "react-konva";

const My_Text = ({ shapeProps, isSelected, onSelect, onChange, attr }) => {

  const textRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Text
        crossOrigin="anonymous"
        text={attr.text}
        fontFamily={attr.fontFamily}
        fontStyle={attr.fontStyle}
        fill={attr.fill}
        onClick={onSelect}
        ref={textRef}
        draggable
        onTransformEnd={e => {
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};
export default My_Text;