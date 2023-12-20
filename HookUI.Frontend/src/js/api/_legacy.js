import "./_core";

/**
-----------------------------------------------------------------------------------
 * Ensure old HookUI functions are setup to redirect to the new instances.
-----------------------------------------------------------------------------------
 * registerPanel works with two different types of panels, for legacy reasons
 * You should pass in .body normally in order to set what elements inside of the
 * $Panel component should be
 * Correct Syntax:
 * window._$hookui.registerPanel({
 *     id: "example.city-monitor",
 *     name: "City Monitor",
 *     icon: "Media/Game/Icons/BuildingLevel.svg",
 *     body: <div>This is inside the $Panel</div>,
 * })
 * Initially though, .component was accepted and should in that case be the $Panel
 * itself. It wasn't correct though, as the $Panel should be managed by HookUI
 * instead of by the mod authors.
 * Legacy Syntax (Don't use this unless you must):
 * window._$hookui.registerPanel({
 *     id: "example.city-monitor",
 *     name: "City Monitor",
 *      icon: "Media/Game/Icons/BuildingLevel.svg",
 *     component: <$Panel title="City Monitor">This is my very own panel</$Panel>,
 * })
 */

window._$hookui = {};

window._$hookui.__registeredPanels = {};

/**
 * Register a plugin
 */
window._$hookui.registerPanel = ({ id, name, icon, component, body, panel_style, type }) => {
    HookUI.register({ id, name, icon, component, body, style: panel_style, type });
};