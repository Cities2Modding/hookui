import React from 'react'
import ReactDOM from 'react-dom';
import { useDataUpdate } from 'hookui-framework'
import $ToolTip from '../components/_tooltip'
import $InfomodeButton from '../components/_infomode-button'

const $HookUIMenu = ({ react }) => {
    const [showMenu, setShowMenu] = react.useState(false)
    const [tooltipVisible, setTooltipVisible] = react.useState(false)

    useDataUpdate(react, "hookui.is_menu_open", (new_val) => {
        setShowMenu(new_val)
    })

    let isHoverOnChild = false;

    //const onMouseEnter = () => {
    //    if (showMenu) {
    //        // If the menu is already shown, you might want to avoid changing the tooltip visibility.
    //        // Alternatively, you can add additional logic here if needed when hovering while the menu is open.
    //        return;
    //    }

    //    // Check if the hover is on the parent element specifically, and not just inherited from a child element.
    //    // This is useful if the child elements have their own hover events that should not trigger the parent's hover state.
    //    if (!isHoverOnChild) {
    //        engine.trigger("audio.playSound", "hover-item", 1); // Uncomment if needed
    //        setTooltipVisible(true);
    //    }
    //};

    //const onMouseLeave = () => {
    //    if (showMenu)
    //        return;
    //    setTooltipVisible(false);
    //};

    const onMouseEnterMenu = () => {
    };

    const onMouseLeaveMenu = () => {
    };

    const onMouseEnterItem = () => {
        engine.trigger("audio.playSound", "hover-item", 1);
    };

    const onMouseLeaveItem = () => {
    };

    const $MenuItem = ({ icon }) => {
        return <img className="icon_ZjN icon_soN icon_Iwk" style={{ maxWidth: '25rem' }} src={icon}></img>
    };

    const $MenuRow = ({ children, onClick }) => {
        return <div className="row_B8G" style={{ padding: 0, margin: 0 }} onClick={onClick} onMouseEnter={onMouseEnterItem} onMouseLeave={onMouseLeaveItem}>
            {children}
        </div>
    };

    const getPanels = () => {
        const panels = window._$hookui.__registeredPanels
        const ks = Object.keys(panels)

        const $panels = ks.map((k) => {
            const panel = panels[k]
            return <$MenuRow onClick={() => window._$hookui.toggleVisibility(panel.id)}>
                <button style={{ borderRadius: '5rem', width: '100%', padding: '20rem', margin: 0, justifyContent: 'left' }} className="button_FBo button_ECf item_It6 item-mouse-states_Fmi">
                    <div style={{ width: '25rem' }}>
                        <$MenuItem icon={panel.icon} />
                    </div>
                    <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start', paddingLeft: '10rem' }}>
                        {panel.name}
                    </div>
                </button>
            </$MenuRow>
        })
        return $panels
    };

    const $Menu = ({ visible }) => {
        const $panels = getPanels()

        if ($panels.length === 0) {
            $panels.push(<$MenuRow>
                No ModUIs added!
            </$MenuRow>)
        }

        const style = {
            position: "fixed",
            bottom: "initial",
            opacity: visible ? 1 : 0,
            left: "48rem",
            top: "52rem",
            width: '225rem',
            marginTop: '12.5rem',
            pointerEvents: visible ? "auto" : "none",
            visibility: visible ? "visible" : "hidden",
            transition: "opacity 0.5s, visibility 0.5s",
            transitionDelay: visible ? "0s" : "0.05s", // Delay applying 'hidden' when fading out
        }

        return <div class="info-layout_BVk" style={style} onMouseEnter={onMouseEnterMenu} onMouseLeave={onMouseLeaveMenu}>
            <div class="infoview-menu_LhU infoview-menu_VQI">
                <div class="panel_YqS menu_O_M">
                    <div class="content_XD5 content_AD7 child-opacity-transition_nkS content_Hzl" style={{ padding: 0 }}>
                        {...$panels}
                    </div>
                </div>
            </div>
        </div>
    };

    const toggleMenu = () => {
        const newVal = !showMenu
        window.engine.trigger('hookui.toggle_menu', newVal)
        // If we're displaying HookUI, hide infoview if it's open
        if (newVal) {
            window.engine.trigger('game.closePanel', 'Game.UI.InGame.InfoviewMenu')
        }

        engine.trigger("audio.playSound", newVal ? "open-menu" : "close-menu", 1);
        engine.trigger("audio.playSound", "select-item", 1);
    };

    react.useEffect(() => {
        const subscription = window.engine.on('game.showPanel', (panel) => {
            if (panel === 'Game.UI.InGame.InfoviewMenu') {
                window.engine.trigger('hookui.toggle_menu', false)
            }
        })
        window.engine.trigger('game.showPanel.subscribe')

        return () => {
            window.engine.trigger('game.showPanel.unsubscribe')
            subscription.clear();
        };
    }, [showMenu])

    const btnClassNames = "button_ke4 button_ke4 button_H9N" + (showMenu ? " selected" : "");

    const portalNode = document.getElementsByClassName("main-container__E2")[0];

    return <$InfomodeButton react={react} onClick={toggleMenu} title="HookUI" description="Click to activate a custom mod tool" icon="coui://hookuiresources/toolbox_white.svg"
        hideTooltip={!showMenu} selected={showMenu}>
            {portalNode && ReactDOM.createPortal(
                <$Menu visible={showMenu} />,
                portalNode
            )}
        </$InfomodeButton>
}

window._$hookui_menu = $HookUIMenu