import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class Tracklist extends React.Component {
    render() {
        return (
            <div className="TrackList">
                <Track />
                <Track />
                <Track />
            </div>
        );
    }
}