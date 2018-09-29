import React from 'react';

const SunCycle = props => {
    let dayLenght = props.sunset - props.sunrise;
    let dayProgress = props.sunset - (new Date() / 1e3).toFixed(0);
    // dayLenght = 1000;
    // dayProgress = 100;
    const posX = Math.cos((dayProgress / dayLenght) * Math.PI) + 1;
    const posY = Math.sin((dayProgress / dayLenght) * Math.PI);

    return <div className="sunCycle">
        <span className="sun">
            <img
                src="./images/icons/sun.svg"
                alt="Sun"
                style={{
                    left: `calc(${posX} * 50% - 25px)`,
                    bottom: `calc((${posY} * 50%) + 50% - 13px)`
                }}
            />
        </span>
        <div>{dayLenght}</div>
        <div>{dayProgress}</div>
        <div>{posX}</div>
        <div>{posY}</div>
    </div>;
}

export default SunCycle;
