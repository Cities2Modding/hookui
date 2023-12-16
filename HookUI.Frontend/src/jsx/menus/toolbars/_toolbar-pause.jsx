import React from 'react'
import $IconButton from '../../components/_icon-button'
import $ToolTipContent from '../../components/_tooltip-content'

const $HookUIToolBarPauseMenu = ({ react }) => {
    const [active, setActive] = react.useState(false);


    react.useEffect(() => {
        // Define a global function
        window._$hookui.pause_panel_toggle_btn = (value) => {
            setActive(value);
        };

        // Clean up the global function when the component unmounts
        return () => {
            delete window._$hookui.pause_panel_toggle_btn;
        };
    }, []);

    const toggleMenu = () => {
        window._$hookui.pause_panel_toggle(!active);
    };

    return (
        <>
            <$IconButton hideTooltip={active} react={react} onClick={toggleMenu} selected={active} holdTooltipOnSelected="false" icon="coui://hookuiresources/toolbox_white.svg"
                tooltipFloat="down" tooltipAlign="right" infoModeStyle="true" tooltipStyle={{ marginTop: '5rem' }} style={{ marginRight: '9rem' }}>
                <$ToolTipContent title="HookUI - Settings" description="Change mod settings" />
            </$IconButton>
        </>
    );
}

window._$hookui_toolbar_pause_menu = $HookUIToolBarPauseMenu;
