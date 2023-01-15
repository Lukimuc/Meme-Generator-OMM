import React from 'react'
import { useParams } from "react-router-dom";


export function Singleview() {
    const { id } = useParams();
    return <h1> Meme ID - gelesen aus URL: {id}</h1>
}
