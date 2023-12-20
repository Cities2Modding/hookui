import React from 'react'
import $IconToolBar from '../../components/_icon-toolbar'

const $HookUIToolBarStartMenu = ({ react }) => {
    const [active, setActive] = react.useState(false);
    const [hasPlugins, setHasPlugins] = react.useState(false);

    HookUIPlugins.useType(react, HookUIPluginType.TOOLBAR_START, (hasPlugins) => {
        setHasPlugins(hasPlugins);
    }, (isOpen) => {
        setActive(isOpen);
    });

    const toggleMenu = (n) => {
        const newValue = !active;
        setActive(newValue);
        HookUI.playSound();
        HookUI.togglePluginType(HookUIPluginType.TOOLBAR_START, newValue);
    };    

    return hasPlugins ? (
        <>
            <div className="spacer_oEi"></div>
            <$IconToolBar react={react}
                title="HookUI - Tools"
                icon="coui://hookuiresources/toolbox3.svg"
                description="Select a tool to use"
                active={active}
                options={HookUI.getPlugins(HookUIPluginType.TOOLBAR_START)}
                noBorder="true"
                tooltipFloat="up" tooltipAlign="center"
                onClick={toggleMenu}
                onItemClick={(option) => HookUI.toggle(option.id)} />
        </>
    ) : null;
}

window._$hookui.toolbar_start_menu = $HookUIToolBarStartMenu;
