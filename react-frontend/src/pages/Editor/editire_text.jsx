import React, {useState} from 'react'


const fontFamilies = [
    { value: "Arial", label: "Arial" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Georgia", label: "Georgia" },
    { value: "Courier New", label: "Courier New" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Roboto", label: "Roboto" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Lato", label: "Lato" },
    { value: "Playfair Display", label: "Playfair Display" },
    { value: "Oswald", label: "Oswald" },
    { value: "Verdana", label: "Verdana" },
    { value: "Nunito", label: "Nunito" },
    { value: "fantasy", label: "fantasy" }
  ];

  const fontStyles = [
    { value: "normal", label: "Normal" },
    { value: "italic", label: "Italic" },
    { value: "oblique", label: "Oblique" },
    { value: "bold", label: "bold" }
  ];

const Editiere_Text = ({text_attr, onClick}) => {

    const [text, setText] = useState("Beispieltext")
    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontStyle, setFontStyle] = useState('normal');
    const [color, setColor] = useState('black');

    return (
        <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <br/>
            <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                {fontFamilies.map(f => (<option key={f.value} value={f.value}>{f.label}</option>))}
            </select>
            <br/>
            <select value={fontStyle} onChange={e => setFontStyle(e.target.value)}>
                {fontStyles.map(f => (<option key={f.value} value={f.value}>{f.label}</option>))}
            </select>
            <br/>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
            <br/>
            <Button onClick={() => onClick(text_attr.key, {text: text, fontFamily: fontFamily, fontStyle: fontStyle, fill: color})}> Submit </Button>
            <p style={{ fontFamily, fontStyle, color }}>{text}</p>
        </div>
    )
}

export default Editiere_Text;