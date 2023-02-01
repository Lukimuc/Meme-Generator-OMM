import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function Graph2() {
    const fetchRef = useRef(false);

    const [fileUploadButtonClickedTotal, setfileUploadButtonClickedTotal] = useState(0);
    const [urlButtonClickedTotal, seturlButtonClickedTotal] = useState(0);
    const [thirdPartyButtonClickedTotal, setthirdPartyButtonClickedTotal] = useState(0);
    const [cameraButtonClickedTotal, setcameraButtonClickedTotal] = useState(0);
    const [drawButtonClickedTotal, setdrawButtonClickedTotal] = useState(0);

    const [data, setData] = useState([
        { name: 'File Upload', clicks: fileUploadButtonClickedTotal },
        { name: 'URL', clicks: urlButtonClickedTotal },
        { name: 'Third Party', clicks: thirdPartyButtonClickedTotal },
        { name: 'Camera', clicks: cameraButtonClickedTotal },
        { name: 'Draw', clicks: drawButtonClickedTotal },
    ]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchRef]);


    async function fetchInitialData() {
        // fetch data from server
        await fetch('http://localhost:3002/log')
            .then(response => response.json())
            .then(data => {
                const updatedData = [
                    { name: 'File Upload', clicks: data.fileUploadButtonClickedTotal },
                    { name: 'URL', clicks: data.urlButtonClickedTotal },
                    { name: 'Third Party', clicks: data.thirdPartyButtonClickedTotal },
                    { name: 'Camera', clicks: data.cameraButtonClickedTotal },
                    { name: 'Draw', clicks: data.drawButtonClickedTotal },
                ];

                setfileUploadButtonClickedTotal(data.fileUploadButtonClickedTotal);
                seturlButtonClickedTotal(data.urlButtonClickedTotal);
                setthirdPartyButtonClickedTotal(data.thirdPartyButtonClickedTotal);
                setcameraButtonClickedTotal(data.cameraButtonClickedTotal);
                setdrawButtonClickedTotal(data.drawButtonClickedTotal);

                setData(updatedData);
            }
            )
    }

    async function handleDiagram(name) {
        // increment the clicks for the button
        const updatedData = [...data];
        const button = updatedData.find(b => b.name === name);
        button.clicks += 1;
        setData(updatedData);

        // send data to server
        await fetch('http://localhost:3002/log', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(updatedMeme => {
                console.log(updatedMeme);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <h3>Button clicks graph</h3>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="clicks" fill="#1976d2" barSize={30} />
            </BarChart>
            <div>
                <button onClick={() => handleDiagram('File Upload')}>File Upload</button>
                <button onClick={() => handleDiagram('URL')}>URL</button>
                <button onClick={() => handleDiagram('Third Party')}>Third Party</button>
                <button onClick={() => handleDiagram('Camera')}>Camera</button>
                <button onClick={() => handleDiagram('Draw')}>Draw</button>
            </div>
        </>
    );
}

export default Graph2;