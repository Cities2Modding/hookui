import React from 'react'
import $ToolTip from './_tooltip'
import $ToolTipContent from './_tooltip-content'

const $InfomodeButton = ({ react, style, children, onClick, title, description, selected, hideTooltip, icon }) => {
    const [tooltipVisible, setTooltipVisible] = react.useState(false)
    const btnClassNames = "button_ke4 button_ke4 button_H9N" + (selected ? " selected" : "");

    const onMouseEnter = () => {
        if (tooltipVisible)
            return;

        engine.trigger("audio.playSound", "hover-item", 1);
        setTooltipVisible(true);
    };

    const onMouseLeave = () => {
        setTooltipVisible(false);
    };

    return <button className={btnClassNames} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        style={{
            position: 'relative',
            marginLeft: "5rem",
            ...style
        }}>
        <div className="tinted-icon_iKo icon_be5" style={{ maskImage: `url(${icon})` }}></div>
        {children}
        <$ToolTip visible={tooltipVisible && hideTooltip} float="down" align="left" style={{ marginTop: '10rem' }}>
            <$ToolTipContent title={title} description={description} />
        </$ToolTip>
    </button>
}

export default $InfomodeButton;