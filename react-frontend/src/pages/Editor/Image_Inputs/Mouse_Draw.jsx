import React, {useRef, useState, useEffect} from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';

import Button from '@mui/material/Button';

const Mouse_Draw = ({push}) => {

  const stageRef = useRef(null);

  useEffect(() => {
    const content = stageRef.current.content;

    content.style.border = '1px solid grey';
    content.style.backgroundColor = 'white';
  }, []);

  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);

  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(300)

  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handlepush = () => {
    if (!stageRef.current) {
        console.log("Stageref ist null")
        return;
    }
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({
        mimeType: 'image/png',
        quality: 1
    });
    push(dataURL)
  };

  return (
    <div>
      <div
        style={{
          width:{width},
          height:{height},
          //border: `1px solid red`
        }}
      >
      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        //style={{ border: '1px solid grey' }}
        ref={stageRef}
      >
        <Layer
          style={{border: '1px solid black'}}
        >
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      </div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <Button variant="contained" onClick={handlepush}>push</Button>
      <label>
        Width:
        <input type="number" value={width} onChange={ (event) => {
          event.preventDefault();
          console.log(window.innerWidth)
          setWidth(parseInt(event.target.value))
        } } />
      </label>
      <label>
        Height:
        <input type="number" value={height} onChange={ (event) => {
          event.preventDefault();
          setHeight(parseInt(event.target.value))
        } } />
      </label>
    </div>
  );
};

export default Mouse_Draw;