import React from "react";
import Clock from 'react-live-clock';

export default class MyClock extends React.Component {
    render() {
        return <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Kolkata'} />
    }
}