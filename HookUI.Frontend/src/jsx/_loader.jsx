import React from 'react'
import {$Panel} from 'hookui-framework'

const $Loader = ({ react }) => {
    const [visibleComponents, setVisibleComponents] = react.useState([]);

    //react.useEffect(() => {
    //    const handleEvent = (e) => {
    //        const { id, type } = e.detail
    //        if (visibleComponents.includes(id)) {
    //            setVisibleComponents(visibleComponents.filter(id_b => id !== id_b))
    //        } else {
    //            setVisibleComponents(visibleComponents => [...visibleComponents, id]);
    //        }
    //    }

    //    HookUIEvents.register(HookUIPluginType.LEGACY, handleEvent);

    //    return () => {
    //        HookUIEvents.unregister(HookUIPluginType.LEGACY, handleEvent);
    //    };
    //}, [visibleComponents]);

    const plugins = HookUI.getPlugins(HookUIPluginType.LEGACY);
    const panels = Object.keys(plugins)
        .filter(i => visibleComponents.includes(i))
        .map(k => plugins[k])

    const to_render = panels.map(p => {
        if (p.component) {
            const el = React.createElement(p.component, {react: react})
            return <div key={p.id}>
                {el}
            </div>
        } else if (p.body) {
            const el = React.createElement(p.body, {react: react})
            return <$Panel key={p.id} title={p.name} react={react} style={p.panel_style || {}}>
                {el}
            </$Panel>
        } else {
            throw new Error('Unknown panel structure for registerPanel, missing .body or .component')
        }
    })

    return <div key="hookui_loader">
        {...to_render}
    </div>
}

window._$hookui_loader = $Loader