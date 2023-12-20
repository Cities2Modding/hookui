import React from 'react'
import $FoldOut from '../components/_foldout'
import $Scrollable from '../components/_scrollable'

const $HookUIPausePanel = ({ react }) => {
    const [active, setActive] = react.useState(false);
    const [expanded, setExpanded] = react.useState(true);
    const [selectedItem, setSelectedItem] = react.useState('');
    const [visiblePlugins, setVisiblePlugins] = react.useState(HookUIPlugins.getPlugins(HookUIPluginType.ADVISOR_PANEL).filter(p => p.isOpen == true));

    const onPluginOpen = (detail) => {
        if (!detail)
            return;

        const plugins = HookUIPlugins.getPlugins(HookUIPluginType.ADVISOR_PANEL).filter(p => p.isOpen == true);
        setVisiblePlugins(plugins);
    };

    const onPluginTypeOpen = (detail) => {
        if (!detail || detail.type != HookUIPluginType.ADVISOR_PANEL)
            return;

        setActive(detail.isOpen);

        if (detai.isOpen)
            setExpanded(true);

        HookUI.playPanelSound(detail.isOpen);
    };

    // Register client side listener
    react.useEffect(() => {
        HookUIEvents.register(HookUIPluginType.ADVISOR_PANEL, onPluginTypeOpen);
        HookUIEvents.register("onPluginOpen", onPluginOpen);

        HookUI.setupPluginType(HookUIPluginType.ADVISOR_PANEL);

        return () => {
            HookUIEvents.unregister(HookUIPluginType.ADVISOR_PANEL, onPluginTypeOpen);
            HookUIEvents.unregister("onPluginOpen", onPluginOpen);
        };
    }, []);

    const onPanelToggle = () => {
        setExpanded(!expanded);
        HookUI.playSound("expand-panel");
    };

    const options = HookUI.getPlugins(HookUIPluginType.ADVISOR_PANEL);

    const getOptions = () => {
        const ks = Object.keys(options);

        return ks.map((k) => {
            const option = options[k];
            const selected = selectedItem === option.name;
            const onItemClick = () => {
                if (selectedItem === option.name)
                    setSelectedItem('');
                else
                    setSelectedItem(option.name);

                HookUI.playSound();
                HookUI.toggle(option.id);
            };
            return <$FoldOut key={'hk_btn_' + k} onItemClick={onItemClick} selected={selected} disableFoldout="true" react={react} icon={option.icon} label={option.name} level="1"></$FoldOut>
        });
    };

    const panelContent = active && expanded ? <div className="content_XD5 content_AD7 child-opacity-transition_nkS">
        <$Scrollable react={react}>
            <$FoldOut react={react} label="Mods" level="0">
                {getOptions()}
            </$FoldOut>
            <$FoldOut react={react} label="HookUI" level="0">
                <$FoldOut react={react} label="Settings" level="1">
                    <$FoldOut react={react} label="Item #2" level="2">
                        <$FoldOut react={react} label="Some content" level="3" disableFoldout="true"></$FoldOut>
                    </$FoldOut>
                </$FoldOut>
            </$FoldOut>
        </$Scrollable>
    </div> : null;

    const onClose = () => {
        HookUI.playSound();
        HookUI.togglePluginType(HookUIPluginType.ADVISOR_PANEL, false);
    };

    const foldoutIcon = expanded ? 'url("Media/Glyphs/ThickStrokeArrowDown.svg")' : 'url("Media/Glyphs/ThickStrokeArrowRight.svg")';
    const panelClassNames = "panel_YqS collapsible advisor-panel_dXi advisor-panel_mrr top-right-panel_A2r" + (!expanded ? " collapsed" : "");

    const content = active ? <div className={panelClassNames}>
        <div className="header_H_U header_Bpo child-opacity-transition_nkS" onClick={onPanelToggle}>
            <div className="title-bar_PF4">
                <div className="icon-space_h_f"></div>
                <div className="icon-space_h_f"></div>
                <div className="title_SVH title_zQN">HOOKUI - Settings</div>
                <div className="tinted-icon_iKo toggle_Q44" style={{ maskImage: foldoutIcon }}></div>
                <button className="button_bvQ button_bvQ close-button_wKK" onClick={onClose}>
                    <div className="tinted-icon_iKo icon_PhD" style={{ maskImage: 'url(Media/Glyphs/Close.svg)' }}></div>
                </button>
            </div>
        </div>
        {panelContent}
    </div> : null;

    return content;
}

window._$hookui.pause_panel = $HookUIPausePanel;