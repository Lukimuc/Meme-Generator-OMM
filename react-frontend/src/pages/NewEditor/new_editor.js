import React, { useState } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import Img from './image';
import useImage from 'use-image';
import Rectangle from './rectangle';
import { StickyNote } from './node';


/*
const LionImage = () => {
    const [image] = useImage('https://konvajs.org/assets/yoda.jpg');
    return <Image image={image} />;
};
*/

const initialRectangles = [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'red',
      id: 'rect1',
    },
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: 'green',
      id: 'rect2',
    },
];
const initialImages = [
    {   
      image:"https://konvajs.org/assets/yoda.jpg",
      id: 'image1',
    },
    {
        image:"https://konvajs.org/assets/lion.png",
      id: 'image2',
    },
];

const New_Editor = () => {
    const [images, setImages] = useState(initialImages);
    const [selectedId, selectShape] = useState(null);

    const [text, setText] = useState("Click to resize. Double click to edit.");
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);
    const [selected, setSelected] = useState(false);
  
    const checkDeselect = (e) => {
      // deselect when clicked on empty area
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectShape(null);
      }
    };
  
    return (

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
            {images.map( (img, i) => {
                return (
                    <Img 
                    key={i}
                    imageUrl={img.image}
                    isSelected={img.id === selectedId}
                    onSelect={() => {
                        console.log(img.id)
                      selectShape(img.id);
                    }}
                    onChange={newAttrs => {
                      const imgs = images.slice();
                      imgs[i] = newAttrs;
                    }}
                    width={i === 0 ? window.innerWidth : img.width}
                    height={i === 0 ? window.innerHeight: img.height}
                    />
                );
            })}
            <StickyNote
          x={50}
          y={50}
          text={text}
          colour="#FFDAE1"
          onTextChange={(value) => setText(value)}
          width={width}
          height={height}
          selected={selected}
          onTextResize={(newWidth, newHeight) => {
            setWidth(newWidth);
            setHeight(newHeight);
          }}
          onClick={() => {
            setSelected(!selected);
          }}
          onTextClick={(newSelected) => {
            setSelected(newSelected);
          }}
        />
            
            {/*
          <My_Image imageurl={"https://konvajs.org/assets/yoda.jpg"}/>
          <My_Image imageurl={"https://konvajs.org/assets/lion.png"}/> 
        */}
          
        </Layer>
      </Stage>
    );
  };


export default New_Editor