import React from 'react'

class Account extends React.Component {

    render () {
        return (
         
            <div> Account ...
                <h1>Your account</h1>
                <h2>Your memes</h2>
                <h2>Your likes</h2>
                <h2>Your comments</h2>
                <a href="#">Logout here</a>
                Own memes
                If you implement account management, you should have a profile page with personal information,
own memes, likes, comments, etc. (depending on what features you implement). Drafts/history of
created memes can also be integrated into the editor. Further, you need login/logout/(forgot
password) pages or use popups for this.
            </div>
        )
    }
}

export default Account;
