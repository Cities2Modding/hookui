import React from 'react'
import $ToolTip from './_tooltip'

const $IconButton = React.forwardRef(({ react, style, children, onClick, selected, hideTooltip, tooltipFloat, tooltipAlign, icon, noBorder, infoModeStyle, infoPanelStyle, tooltipStyle, holdTooltipOnSelected = "true" }, ref) => {
    const [tooltipVisible, setTooltipVisible] = react.useState(false);

    const getButtonClassNames = () => {
        const baseClassName = infoModeStyle ? "button_ke4 button_ke4" :
            infoPanelStyle ? "button_FBo item_IYJ" :
                "button_cBV";

        const additionalClassNames = !infoModeStyle && infoPanelStyle ?"button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_DTm" : "";

        const selectedClassName = selected ? " selected" : "";

        const borderCondition = (noBorder && noBorder !== 'false') && !infoModeStyle && !infoPanelStyle;
        const borderClassName = borderCondition ? " button_cBV" :
            !infoModeStyle && !infoPanelStyle ? " button_s2g toggle-states_X82" :
                "";

        return `${baseClassName} ${additionalClassNames}${selectedClassName}${borderClassName}`;
    }

    const btnClassNames = getButtonClassNames();

    const onMouseEnter = () => {
        if (tooltipVisible)
            return;

        engine.trigger("audio.playSound", "hover-item", 1);
        setTooltipVisible(true);
    };

    const onMouseLeave = () => {
        setTooltipVisible(false);
    };

    const iconClassName = infoPanelStyle ? "icon_ZjN icon_soN icon_Iwk" : "icon_KJZ icon_soN icon_Iwk";
    const iconElement = infoModeStyle ?
        <div className="tinted-icon_iKo icon_be5" style={{ maskImage: `url(${icon})` }}></div> : <img className={iconClassName} src={icon} />

    return <button ref={ref} className={btnClassNames} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        style={{ position: 'relative', ...style }}>
        {iconElement}
        <$ToolTip inline={infoPanelStyle === 'true'} visible={tooltipVisible && !hideTooltip || (selected && holdTooltipOnSelected === "true")} clickable={selected && holdTooltipOnSelected === "true"} float={tooltipFloat} align={tooltipAlign} style={tooltipStyle}>
            {children}
        </$ToolTip>
    </button>
});

export default $IconButton;