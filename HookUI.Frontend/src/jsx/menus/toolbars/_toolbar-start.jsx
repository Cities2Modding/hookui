import React from 'react'
import $IconToolBar from '../../components/_icon-toolbar'

const $HookUIToolBarStartMenu = ({ react }) => {
    return (
        <>
            <div className="spacer_oEi"></div>
            <$IconToolBar react={react}
                title="HookUI - Tools"
                icon="coui://hookuiresources/toolbox3.svg"
                description="Select a tool to use"
                options={window._$hookui.__registeredPanels}
                noBorder="true"
                tooltipFloat="up" tooltipAlign="center"
                onItemClick={(option) => window._$hookui.toggleVisibility(option.id)} />
        </>
    );
}

window._$hookui_toolbar_start_menu = $HookUIToolBarStartMenu;
