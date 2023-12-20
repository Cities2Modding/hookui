import React from 'react'
import $IconButton from './_icon-button'
import $ToolTipContent from './_tooltip-content'

const $IconToolBar = ({ react, title, description, icon, active, options, style, onItemClick, onClick, noBorder = false, tooltipAlign = "center", tooltipFloat = "up", infomodeStyle, tooltipStyle, hasSpacer = true }) => {
    const [clicked, setClicked] = react.useState(active)
    const [hoveredItem, setHoveredItem] = react.useState("")
    const buttonRef = react.useRef(null);

    let releaseHoverTimeout = null;

    //const handleClickOutside = (event) => {
    //    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
    //        setClicked(false);
    //        document.removeEventListener('click', handleClickOutside, true);
    //    }
    //};

    //react.useEffect(() => {
    //    if (clicked) {
    //        document.addEventListener('click', handleClickOutside, true);
    //    }

    //    return () => {
    //        document.removeEventListener('click', handleClickOutside, true);
    //    };
    //}, [clicked]); // Effect runs when `clicked` changes

    const toggleDropdownMenu = () => {
        const newVal = !clicked;
        setClicked(newVal);

        engine.trigger("audio.playSound", newVal ? "open-menu" : "close-menu", 1);
        engine.trigger("audio.playSound", "select-item", 1);

        //if (newVal)
        //    document.addEventListener('click', handleClickOutside, true);
        //else
        //    document.removeEventListener('click', handleClickOutside, true);

        if (onClick)
            onClick(newVal);
    }

    const onMouseEnterItem = (event) => {
        let element = event.target;
        const tooltipText = element.getAttribute("data-tooltip");

        setHoveredItem(tooltipText);

        if (releaseHoverTimeout != null)
            clearTimeout(releaseHoverTimeout);

        engine.trigger("audio.playSound", "hover-item", 1);
    };

    const onMouseLeaveItem = () => {
        if (releaseHoverTimeout != null)
            return;

        releaseHoverTimeout = setTimeout(function () {
            setHoveredItem("");
            releaseHoverTimeout = null;
        }, 300);
    };

    const getToolBarOptions = () => {
        const ks = Object.keys(options);

        return ks.map((k) => {
            const option = options[k];
            let classNames = "button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_X82 toggle-states_DTm";

            if (option.isOpen)
                classNames += " selected";

            return <button data-tooltip={option.name} key={'hk_btn_' + k} onMouseEnter={onMouseEnterItem} onMouseLeave={onMouseLeaveItem}
                onClick={() => onItemClick(option)} className={classNames}
                style={{ marginLeft: '5rem' }}>
                <img className="icon_KJZ icon_soN icon_Iwk" src={option.icon} style={{ maxWidth: '25rem' }} />
            </button>
        });
    };

    const toolTipContent = clicked ? (<>
        <div className="title_lCJ" style={{ textAlign: tooltipAlign, color: 'var(--menuText1Normal)' }}>{title}</div>
        <div className="title_lCJ" style={{ textAlign: tooltipAlign, fontWeight: 'normal', color: 'var(--accentColorNormal)' }}>{hoveredItem}</div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '5rem', width: '100%' }}>
            {getToolBarOptions()}
        </div>
    </>) : (<$ToolTipContent title={title} description={description} />);

    const spacerContent = hasSpacer === true ? <div className="spacer_oEi"></div> : <></>;

    return (
        <>
            {spacerContent}
            <$IconButton ref={buttonRef} react={react} onClick={toggleDropdownMenu} selected={clicked} icon={icon} noBorder={noBorder}
                tooltipFloat={tooltipFloat} tooltipAlign={tooltipAlign} infoModeStyle={infomodeStyle} tooltipStyle={tooltipStyle} style={style}>
                {toolTipContent}
            </$IconButton>
        </>
    );
}

export default $IconToolBar;