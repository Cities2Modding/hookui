import React from 'react'
import $ToolTip from './_tooltip'

const $IconButton = ({ react, style, children, onClick, selected, hideTooltip, tooltipFloat, tooltipAlign, icon, noBorder, infoModeStyle, tooltipStyle, holdTooltipOnSelected = "true" }) => {
    const [tooltipVisible, setTooltipVisible] = react.useState(false)
    const btnClassNames = (infoModeStyle ? "button_ke4 button_ke4" : "button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT button_cBV toggle-states_DTm" ) +
        (selected ? " selected" : "") +
        ( (noBorder && noBorder !== 'false') && !infoModeStyle ? " button_cBV" : !infoModeStyle ? " button_s2g toggle-states_X82" : "");

    const onMouseEnter = () => {
        if (tooltipVisible)
            return;

        engine.trigger("audio.playSound", "hover-item", 1);
        setTooltipVisible(true);
    };

    const onMouseLeave = () => {
        setTooltipVisible(false);
    };

    const iconElement = infoModeStyle ?
        <div className="tinted-icon_iKo icon_be5" style={{ maskImage: `url(${icon})` }}></div> : <img className="icon_KJZ icon_soN icon_Iwk" src={icon} />

    return <button className={btnClassNames} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        style={{ position: 'relative', ...style }}>
        {iconElement}
        <$ToolTip visible={tooltipVisible && !hideTooltip || (selected && holdTooltipOnSelected === "true")} clickable={selected && holdTooltipOnSelected === "true"} float={tooltipFloat} align={tooltipAlign} style={tooltipStyle}>
            {children}
        </$ToolTip>
    </button>
}

export default $IconButton;