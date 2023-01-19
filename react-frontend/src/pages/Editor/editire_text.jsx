import React, {useState} from 'react'

const Editiere_Text = ({text_attr}) => {
    return (
        <div>
            <p> {text_attr.text} </p>
            <p> {text_attr.fontFamily} </p>
            <p> {text_attr.fontStyle} </p>
            <p> {text_attr.fill} </p>
        </div>
    )
}

export default Editiere_Text;