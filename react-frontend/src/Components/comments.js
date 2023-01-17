import { useState, useEffect } from "react";
/*import {getComments as getCommentsApi} from '../getComments'*/

const Comments = ({currentUserId}) => {
    return <div> Comments</div>;
    
const Comments = ({currentUserId}) => {
const [backendComments, setBackendComments] = useState([])
const rootComments = backendComments.filter(backendComment => backendComment.parentID === null);
/*
useEffect(() => {
getCommentsApi().then(data => {
    setBackendComments(data);
})
        }, []);*/

        return 
        <div className="comments">
            <h3 className="comments-title"> Comments</h3>;
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <div> {rootComments.body}</div>
                )
                )
                }
            </div>
            </div>
    }
}
export default Comments;
