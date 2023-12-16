window._$hookui = {} 

window._$hookui.__registeredPanels = {}

// registerPanel works with two different types of panels, for legacy reasons
// You should pass in .body normally in order to set what elements inside of the
// $Panel component should be
// Correct Syntax:
// window._$hookui.registerPanel({
//     id: "example.city-monitor",
//     name: "City Monitor",
//     icon: "Media/Game/Icons/BuildingLevel.svg",
//     body: <div>This is inside the $Panel</div>,
// })
// Initially though, .component was accepted and should in that case be the $Panel
// itself. It wasn't correct though, as the $Panel should be managed by HookUI
// instead of by the mod authors.
// Legacy Syntax (Don't use this unless you must):
// window._$hookui.registerPanel({
//     id: "example.city-monitor",
//     name: "City Monitor",
//     icon: "Media/Game/Icons/BuildingLevel.svg",
//     component: <$Panel title="City Monitor">This is my very own panel</$Panel>,
// })
window._$hookui.registerPanel = ({id, name, icon, component, body, panel_style}) => {
    console.log('[HookUI] Registering UI for ', id, name)
    if (component) {
        console.warn(`[HookUI] ${id}:${name} is registered as a $Panel. Please pass in .body instead of .component with the children of $Panel`)
    }
    window._$hookui.__registeredPanels[id] = {id, name, icon, component, body, panel_style}
}

window._$hookui.toggleVisibility = (id) => {   
    const event = new CustomEvent('hookui', { detail: { type: "toggle_visibility", id: id } });
    window.dispatchEvent(event);
}