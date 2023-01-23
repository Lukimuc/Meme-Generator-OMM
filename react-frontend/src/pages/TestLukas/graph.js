import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function Graph() {
    const [todayViews, setTodayViews] = useState(0);
    const fetchRef = useRef(false);

    useEffect(() => {
        fetchInitialData();
    }, [fetchRef]);


    const [data, setData] = useState([
        { name: 'Three Days ago', pageViews: 7 },
        { name: 'Two Days ago', pageViews: 13 },
        { name: 'Yesterday', pageViews: 5 },
        { name: 'Today', pageViews: todayViews },
    ]);

    async function fetchInitialData() {
        // fetch data from server
        await fetch('http://localhost:3002/memes/63cd2d3ff1c0d87ee13b66bf')
            .then(response => response.json())
            .then(initialMeme => {
                const updatedData = [...data];
                updatedData[3].pageViews = initialMeme.viewsToday;
                setTodayViews(initialMeme.viewsToday);
                setData(updatedData);
                updateData();
            }).catch(error => {
                console.log(error)
            });
    }
    
    

    async function updateData() {
        // increment the page views for today
        const updatedData = [...data];
        updatedData[3].pageViews += 1;

        // send data to server
        await fetch('http://localhost:3002/memes/63cd2d3ff1c0d87ee13b66bf', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                viewsToday: updatedData[3].pageViews
            })
        })
            .then(response => response.json())
            .then(updatedMeme => {
                setTodayViews(updatedMeme.viewsToday)
                setData(updatedData)
            }).catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <h3>Dynamic views graph</h3>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line dataKey="pageViews" fill="#1976d2" barSize={30} />
            </LineChart>
        </>
    );
    
}

export default Graph;
