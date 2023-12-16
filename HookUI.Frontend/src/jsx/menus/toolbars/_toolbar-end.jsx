import React from 'react'
import $IconToolBar from '../../components/_icon-toolbar'

const $HookUIToolBarEndMenu = ({ react }) => {
    return (
        <>
            <div className="spacer_oEi"></div>
            <$IconToolBar react={react}
                title="HookUI - Info & Systems"
                icon="coui://hookuiresources/toolbox.svg"
                description="Mod information views and systems"
                options={window._$hookui.__registeredPanels}
                noBorder="false"
                tooltipFloat="up" tooltipAlign="right"
                onItemClick={(option) => window._$hookui.toggleVisibility(option.id)} />
        </>
    );
}

window._$hookui_toolbar_end_menu = $HookUIToolBarEndMenu;
