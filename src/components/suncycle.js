import React from 'react';

const SunCycle = props => {

    let dayLength = props.sunset - props.sunrise;
    let dayProgress = props.sunset - (new Date() / 1e3).toFixed(0);
    const sunPositionX = Math.cos((dayProgress / dayLength) * Math.PI) + 1;
    const sunPositionY = Math.sin((dayProgress / dayLength) * Math.PI);

    return <div className="sunCycle">
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
