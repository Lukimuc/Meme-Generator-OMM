import React, { useState } from 'react'
import { Stage, Layer, Text, Image } from 'react-konva';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // Grid version 1
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
                
            </div>
          
            <Grid container p={10} paddingLeft={20}>
            <Grid item md={8}>
            <div style={{
                display: "block",
               /* float: "left",*/
                border: "5px outset blue",
                height: height,
                /*width: "50%",*/
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
                       </Grid>

                       <Grid item md={4} style={{ backgroundColor: 'lightgrey'}}>
            <div>
            <p style={{
                fontSize: 40,
                textAlign: 'center',
                }}>Editor</p>
               
                <form style={{
marginLeft: 30
            }}>
                    <label >Add new text</label><br/>
                    <TextField id="outlined-basic" type="text" value={inputtext || ""} onChange={(e) => setInputtext(e.target.value)} style={{
                   backgroundColor: 'white', 
                   borderRadius:'0.25rem', marginBottom: 10 }}/><br/>
                    <Button id="submitText" variant="contained" onClick={(e) => {
                        e.preventDefault();
                        setInputs( arr => [...arr, inputtext])
                    }}>Submit Text</Button>
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

                    <Button id="submitImage" display='none' variant="contained" onClick={(e) => {
                        e.preventDefault();
                        setImages( img => [...img, imagesrc])
                    }}>Submit Image</Button>
                    <p>{inputtext}</p>
                    <Grid md={6} marginBottom={2}>
                    <Button id="download" variant="contained">Download <DownloadIcon /></Button>
                    </Grid><Grid md={6} marginBottom={2}>
                    <Button variant="contained">Share <ShareIcon /></Button>
                    </Grid>
                </form>

                
            </div>
            </Grid>
            </Grid>
            
        </div>

        )
    }
export default Editor;
/* = ({template, onClick}) => {
    return (
        <img 
        key={template.id} 
        style={{width: 200}}
        src={template.url} 
        alt={template.name}
        onClick={onClick}
      />

    )
    
}*/