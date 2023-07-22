"use client"

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import { FC } from 'react';

interface VideoPlayerProps {
    id: string
}

const VideoPlayer: FC<VideoPlayerProps> = ({id}) => {
    return (
        <LiteYouTubeEmbed 
            id={id}
            title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
        />
    );
};

export default VideoPlayer;