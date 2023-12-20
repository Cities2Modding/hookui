import React from 'react'
import $Scrollable from '../components/_scrollable'
import $ToolTipContent from '../components/_tooltip-content'
import $IconButton from '../components/_icon-button'

const $HookUIInfomodePanel = ({ react }) => {
    const [active, setActive] = react.useState(false);
    const [visiblePlugins, setVisiblePlugins] = react.useState([]);

    HookUIPlugins.use(react, HookUIPluginType.INFO_PANEL, (plugins) => {
        setVisiblePlugins(plugins);
    });

    HookUIPlugins.useType(react, HookUIPluginType.INFO_PANEL, null, (isOpen) => {
        setActive(isOpen);
        HookUI.playPanelSound(isOpen);
        if (isOpen) {
            engine.trigger("game.closePanel", "Game.UI.InGame.InfoviewMenu");
        }
    });

    const onGameShowPanel = (detail) => {
        if (!detail)
            return;

        const panel = detail.panel;

        if (panel !== 'Game.UI.InGame.InfoviewMenu')
            return;

        const plugins = HookUIPlugins.getPlugins(HookUIPluginType.INFO_PANEL).filter(p => p.isOpen == true);
        HookUI.togglePluginType(HookUIPluginType.INFO_PANEL, false);
        setActive(false);

        // Close plugins open for this view
        plugins.forEach(p => {
            HookUI.setPluginOpen(p.id, false);
        });
    };
    
    react.useEffect(() => {
        HookUIEvents.register("onGameShowPanel", onGameShowPanel);
        return () => {
            HookUIEvents.unregister("onGameShowPanel", onGameShowPanel);
        };
    }, []);    

    const options = HookUI.getPlugins(HookUIPluginType.INFO_PANEL);

    const getOptions = () => {
        const ks = Object.keys(options);
        const rows = [];

        for (let i = 0; i < ks.length; i += 4) {
            const rowItems = ks.slice(i, i + 4).map((k) => {
                const option = options[k];
                const selected = option.isOpen;
                const onItemClick = () => {
                    HookUI.playSound();
                    HookUI.toggle(option.id);
                };

                return <$IconButton key={'hk_btn_' + k} react={react} selected={selected} holdTooltipOnSelected="false" icon={option.icon}
                    tooltipFloat="up" tooltipAlign="left" infoPanelStyle="true" onClick={onItemClick}>
                    <$ToolTipContent title={option.name} />
                </$IconButton>
            });
            rows.push(<div key={'hk_row_' + i} className="row_B8G">{rowItems}</div>);
        }

        return rows;
    };

    const panelContent = active ? <div className="content_XD5 content_AD7 child-opacity-transition_nkS content_Hzl">
        {getOptions()}
    </div> : null;
    
    const panelElement = visiblePlugins.map(p => {
        const component = p.component;

        if (component) {
            const el = React.createElement(component, { react: react })
            const onClose = () => {
                HookUI.playSound();
                HookUI.setPluginOpen(p.id, false);
            };
            return <div key={p.id} title={p.name} style={p.panel_style || {}}>
                <div className="panel_YqS active-infoview-panel_aTq" style={{ marginRight: '7.5rem' }}>
                    <div className="header_H_U header_Bpo child-opacity-transition_nkS">
                        <div className="title-bar_PF4 title_HFc">
                            <img className="icon_OVK" src={p.icon} />
                            <div className="title_SVH title_zQN">{p.name}</div>
                            <button className="button_bvQ button_bvQ close-button_wKK" onClick={onClose}>
                                <div className="tinted-icon_iKo icon_PhD" style={{ maskImage: 'url(Media/Glyphs/Close.svg)' }}></div>
                            </button>
                        </div>
                    </div>
                    <div className="content_XD5 content_AD7 child-opacity-transition_nkS">
                        <$Scrollable react={react}>
                            <div className="infomodes-panel_B0O">
                                <div className="labels_L7Q row_S2v uppercase_RJI">
                                    <div className="left_Lgw row_S2v">Another test</div>
                                    <div className="space_uKL"></div>
                                </div>
                            </div>
                        </$Scrollable>
                    </div>
                </div>
            </div>
        }        
        return null;
    });

    const content = active ? <div className="panel_YqS menu_O_M">
        {panelContent}
    </div> : null;

    return <div className="infoview-menu_LhU infoview-menu_VQI">
        {content}
        {panelElement}
    </div>;
}

export default $HookUIInfomodePanel;