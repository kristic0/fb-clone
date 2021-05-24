import React from 'react'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import './Feed.css'
import Post from './Post'

const Feed = () => {
    return (
        <div className='feed'>
            <StoryReel />
            <MessageSender />
            <Post
                profilePic='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' 
                message='Moj prvi post!'
                timestamp='1601493943737'
                imgName='imgName'
                username='Frankie' 
            />
        </div>
    )
}

export default Feed
