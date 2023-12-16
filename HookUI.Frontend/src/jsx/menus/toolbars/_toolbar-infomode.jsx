import React from 'react'
import $IconToolBar from '../../components/_icon-toolbar'

const $HookUIToolBarInfomodeMenu = ({ react }) => {
    return (
        <>
            <$IconToolBar react={react}
                title="HookUI - Tools"
                icon="coui://hookuiresources/toolbox_white.svg"
                description="Select a tool to use"
                options={window._$hookui.__registeredPanels}
                infomodeStyle="true"
                tooltipFloat="down" tooltipAlign="left"
                tooltipStyle={{ marginTop: '5rem' }}
                hasSpacer="false"
                onItemClick={(option) => window._$hookui.toggleVisibility(option.id)} style={{ marginLeft: '9rem' }} />
        </>
    );
}

window._$hookui_toolbar_infomode_menu = $HookUIToolBarInfomodeMenu;
