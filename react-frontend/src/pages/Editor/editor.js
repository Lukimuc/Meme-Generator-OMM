import React, { useState } from 'react'
import { Stage, Layer, Text, Image } from 'react-konva';


class URLImage extends React.Component {
    state = {
      image: null,
    };
    componentDidMount() {
      this.loadImage();
    }
    componentDidUpdate(oldProps) {
      if (oldProps.src !== this.props.src) {
        this.loadImage();
      }
    }
    componentWillUnmount() {
      this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
      // save to "this" to remove "load" handler on unmount
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.setState({
        image: this.image,
      });
      // if you keep same image object during source updates
      // you will have to update layer manually:
      // this.imageNode.getLayer().batchDraw();
    };
    render() {
      return (
        <Image
          x={this.props.x}
          y={this.props.y}
          image={this.state.image}
          ref={(node) => {
            this.imageNode = node;
          }}
          draggable={true}
        />
      );
    }
  }
const Editor = () => {
    //const dragUrl = React.useRef();
    const stageRef = React.useRef();
    
    //const width = window.innerWidth
    const height = window.innerHeight

    const [inputtext, setInputtext] = useState()
    const [inputs, setInputs] = useState([])
    const [imagesrc, setImageSrc] = useState()
    const [images, setImages] = useState([])

    return (
        <div>
            <div>
                Hier wird der Editor sein:
            </div>
            <div style={{
                display: "block",
                float: "left",
                border: "5px outset blue",
                height: height,
                width: "50%",
                }}
            >
                <Stage 
                    width={window.innerHeight}
                    height={window.innerHeight}
                    style={{
                        border: "1px outset red",
                    }}
                    ref={stageRef}>
                    <Layer>
                        {inputs.map( (input) => { return <Text key={input} text={input} draggable={true} />}) }
                        {images.map( (image) => { return <URLImage src={image} /> }) }
                    </Layer>
                </Stage>
            </div>
            <div>
                <form>
                    <label>Text hinzufügen</label><br/>
                    <input type="text" value={inputtext || ""} onChange={(e) => setInputtext(e.target.value)}/><br/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setInputs( arr => [...arr, inputtext])
                    }}>Submit</button>
                    <br/>
                    <img
                        alt="lion"
                        src="https://konvajs.org/assets/lion.png"
                        draggable="true"
                        onClick={(e) => {
                            setImageSrc(e.target.src)
                        }}
                    />
                    <br/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImages( img => [...img, imagesrc])
                    }}>Submit Image</button>
                    <p>{inputtext}</p>
                    
                </form>
            </div>
        </div>
        )
    }

export default Editor