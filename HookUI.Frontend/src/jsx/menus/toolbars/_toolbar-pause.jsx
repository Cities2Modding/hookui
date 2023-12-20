import React from 'react'
import $IconButton from '../../components/_icon-button'
import $ToolTipContent from '../../components/_tooltip-content'

const $HookUIToolBarPauseMenu = ({ react }) => {
    const [active, setActive] = react.useState(false);
    const [hasPlugins, setHasPlugins] = react.useState(false);

    HookUIPlugins.useType(react, HookUIPluginType.ADVISOR_PANEL, (hasPlugins) => {
        setHasPlugins(hasPlugins);
    }, (isOpen) => {
        setActive(isOpen);
    });    

    const toggleMenu = () => {
        const newValue = !active;
        setActive(newValue);
        HookUI.playSound();
        HookUI.togglePluginType(HookUIPluginType.ADVISOR_PANEL, newValue);
    };    

    return hasPlugins ? <$IconButton hideTooltip={active} react={react} onClick={toggleMenu} selected={active} holdTooltipOnSelected="false" icon="coui://hookuiresources/toolbox_white.svg"
        tooltipFloat="down" tooltipAlign="right" infoModeStyle="true" tooltipStyle={{ marginTop: '5rem' }} style={{ marginRight: '9rem' }}>
        <$ToolTipContent title="HookUI - Settings" description="Change mod settings" />
    </$IconButton> : null;
}

window._$hookui.toolbar_pause_menu = $HookUIToolBarPauseMenu;
