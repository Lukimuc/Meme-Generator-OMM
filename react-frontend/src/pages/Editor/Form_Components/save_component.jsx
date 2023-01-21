import React, { useRef } from 'react';
import { saveAs } from 'file-saver';
import { render } from 'react-dom';
import Konva from 'konva';

function Save_Form({ stageRef }) {
  const handleSave = () => {
    if (!stageRef.current) {
        console.log("Stageref ist null")
        return;
    }
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({
        mimeType: 'image/png',
        quality: 1
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'image.png';
    link.click();
    // do something with the dataURL, like setting it as the source for an image element
    //console.log(dataURL);
  };

  return (
    <div>
        <p> Hier kann das Borad gespeichert werden</p>
        <button onClick={handleSave}>Save</button>+
    </div>
  );
}

export default Save_Form;