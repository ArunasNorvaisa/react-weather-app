import React from 'react';

const SunCycle = props => {
    const dayLenght = props.sunset - props.sunrise;
    const dayProgress = props.sunset - (new Date() / 1e3).toFixed(0);
    const posX = Math.cos((dayProgress / dayLenght) * Math.PI);
    const posY = Math.sin((dayProgress / dayLenght) * Math.PI);

    return <div className="sunCycle">
        <span className="sun"></span>
        <div>{dayLenght}</div>
        <div>{dayProgress}</div>
        <div>{posX}</div>
        <div>{posY}</div>
    </div>;
}

export default SunCycle;
