import React from 'react'
import $FoldOut from '../components/_foldout'
import $Scrollable from '../components/_scrollable'

const $HookUIPausePanel = ({ react }) => {
    const [active, setActive] = react.useState(false);
    const [expanded, setExpanded] = react.useState(true);

    react.useEffect(() => {
        // Define a global function
        window._$hookui.pause_panel_toggle = (value) => {
            setActive(value);
            engine.trigger("audio.playSound", value ? "open-panel" : "close-panel", 1);
            engine.trigger("audio.playSound", "select-item", 1);

            if (value)
                setExpanded(true);

            window._$hookui.pause_panel_toggle_btn(value);
        };

        // Clean up the global function when the component unmounts
        return () => {
            delete window._$hookui.pause_panel_toggle;
        };
    }, []);

    const onPanelToggle = () => {
        setExpanded(!expanded);
        engine.trigger("audio.playSound", "expand-panel", 1);
    };

    const options = window._$hookui.__registeredPanels;

    const getOptions = () => {
        const ks = Object.keys(options);

        return ks.map((k) => {
            const option = options[k];
            return <$FoldOut key={'hk_btn_' + k} disableFoldout="true" react={react} icon={option.icon} label={option.name.toUpperCase()} level="1">
            </$FoldOut>
        });
    };

    const panelContent = expanded ? <div className="content_XD5 content_AD7 child-opacity-transition_nkS">
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
    </div> : <></>;

    const onClose = () => {
        window._$hookui.pause_panel_toggle(false);
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
    </div> : <></>;

    return content;
}

window._$hookui_pause_panel = $HookUIPausePanel;
