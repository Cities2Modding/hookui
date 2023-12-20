import React from 'react'
import $IconToolBar from '../../components/_icon-toolbar'

const $HookUIToolBarEndMenu = ({ react }) => {
    const [active, setActive] = react.useState(false);
    const [hasPlugins, setHasPlugins] = react.useState(false);
    
    HookUIPlugins.useType(react, HookUIPluginType.TOOLBAR_END, (hasPlugins) => {
        setHasPlugins(hasPlugins);
    }, (isOpen) => {
        setActive(isOpen);
    });

    const toggleMenu = (n) => {
        const newValue = !active;
        setActive(newValue);
        HookUI.playSound();
        HookUI.togglePluginType(HookUIPluginType.TOOLBAR_END, newValue);
    };

    return hasPlugins ? (
        <>
            <div className="spacer_oEi"></div>
            <$IconToolBar react={react}
                title="HookUI - Systems"
                icon="coui://hookuiresources/toolbox.svg"
                description="Misc mods and systems"
                active={active}
                options={HookUI.getPlugins(HookUIPluginType.TOOLBAR_END)}
                noBorder="false"
                tooltipFloat="up" tooltipAlign="right"
                onClick={toggleMenu}
                onItemClick={(option) => HookUI.toggle(option.id)} />
        </>
    ) : null;
}

window._$hookui.toolbar_end_menu = $HookUIToolBarEndMenu;
