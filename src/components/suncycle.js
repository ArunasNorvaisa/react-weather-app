import React from 'react';

const SunCycle = props => {

    const dayLength = props.sunset - props.sunrise;
    const timeNow = (new Date() / 1e3).toFixed(0);
    const dayProgress = props.sunset - timeNow;
    let sunPositionX = Math.cos((dayProgress / dayLength) * Math.PI) + 1;
    let sunPositionY = Math.sin((dayProgress / dayLength) * Math.PI);

    if(timeNow < props.sunrise) {
        sunPositionX = 0;
        sunPositionY = 0;
    } else if(timeNow > props.sunset) {
        sunPositionX = 2;
        sunPositionY = 0;
    }

    const getTime = time => {
        const options = {
            timeZone: props.timezone,
            hour    : '2-digit',
            minute  : '2-digit',
            hour12  : true
        };
        return new Date(time * 1e3).toLocaleTimeString('en', options);
    };

    return <div className="sunCycle">
        <span className="sunrise">
            <img src="./images/icons/sunrise.svg" alt="Sunrise" />
            <span className="sunriseTime">{ getTime(props.sunrise) }</span>
        </span>
        <span className="sunset">
            <span className="sunsetTime">{ getTime(props.sunset) }</span>
            <img src="./images/icons/sunset.svg" alt="Sunset" />
        </span>
        <span className="sun">
            <img
                src="./images/icons/sun.svg"
                alt="Sun"
                style={{
                    left: `calc(${sunPositionX} * 50% - 23px)`,
                    bottom: `calc((${sunPositionY} * 100%) - 12px)`
                }}
            />
        </span>
    </div>;
}

export default SunCycle;
