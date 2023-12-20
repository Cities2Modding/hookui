import React from 'react'

const $FoldOut = React.forwardRef(({ react, style, children, level, icon, label, disableFoldout, onToggle, onItemClick, selected }, ref) => {
    const [expanded, setExpanded] = react.useState(!level || level === "0");
    const isRootLevel = !level || level === "0";
    const nestingStyle = !isRootLevel ? { '--nesting': level } : { '--nesting': 0 };
    const itemIcon = icon ? icon : disableFoldout ? 'Media/Game/Icons/TutorialPhase.svg' : 'Media/Game/Icons/Water.svg';
    const itemIconElement = isRootLevel ? <></> : <img src={itemIcon} />;
    const foldoutIcon = expanded ? 'url("Media/Glyphs/ThickStrokeArrowDown.svg")' : 'url("Media/Glyphs/ThickStrokeArrowRight.svg")';
    const tintedIconElement = !disableFoldout ? <div className="tinted-icon_iKo toggle_NYV toggle_yQv" style={{ maskImage: foldoutIcon }}></div> : <></>;
    const foldoutClassNames = (isRootLevel ? 'foldout-item_EBr foldout-item_wOF category_Zf1' : 'foldout-item_EBr foldout-item_wOF') + (selected ? " selected" : "");
    const contentElement = !disableFoldout && expanded ? <div className="content_mJm foldout-expanded">
        {children}
    </div> : <></>;

    const onHeaderClick = () => {
        if (disableFoldout) {
            engine.trigger("audio.playSound", "select-item", 1);
            if (onItemClick)
                onItemClick();
            return;
        }
        setExpanded(!expanded);
        engine.trigger("audio.playSound", "expand-panel", 1);

        if (onToggle)
            onToggle(expanded);
    };

    const onHeaderHover = () => {
        engine.trigger("audio.playSound", "hover-item", 1);
    };

    return <div ref={ref} className={foldoutClassNames} style={{ ...nestingStyle, ...style }}>
        <div className="header_h0B header_8H_ item-mouse-states_Fmi item-focused_FuT" onClick={onHeaderClick} onMouseEnter={onHeaderHover}>
            <div className="icon_pQQ icon_I32">{itemIconElement}</div>
            <div className="header-content_owU header-content_wUX">{level === "1" ? label.toUpperCase() : label}</div>
            {tintedIconElement}
        </div>
        {contentElement}
    </div>
});

export default $FoldOut;