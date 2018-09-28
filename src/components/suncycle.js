import React from 'react';

const SunCycle = props => {
    const dayLenght = props.sunset - props.sunrise;
    const timeNow = (new Date() / 1e3).toFixed(0);
    const dayProgress = dayLenght - (props.sunset - timeNow);
    const posX = Math.cos((dayProgress / dayLenght) * (Math.PI / 2));
    const posY = Math.sin((dayProgress / dayLenght) * (Math.PI / 2));
    console.log(dayLenght, dayProgress, posX, posY);

    return <div className="sunCycle">
        <span className="sun"></span>
    </div>;
}

export default SunCycle;
