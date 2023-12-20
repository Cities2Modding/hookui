import React from "react";
import $HookUIInfomodePanel from "./panels/_infomode-panel";

const $HookUIMainContainer = ({ react }) => {
    const [visiblePlugins, setVisiblePlugins] = react.useState([]);

    HookUIPlugins.use(react, HookUIPluginType.LEGACY, (plugins) => {
        setVisiblePlugins(plugins);
    });    
        
    const pluginElements = visiblePlugins.map(p => {
        const component = p.component;
        if (component) {
            const el = React.createElement(component, { react: react });
            return <div key={p.id}>
                {el}
            </div>
        }
        else {
            throw new Error('Unknown panel structure for registerPanel, missing .body or .component');
        }
    });

    return <>
        <div className="info-layout_BVk">
            <$HookUIInfomodePanel react={react} />
        </div>
        {pluginElements}
    </>;
};

window._$hookui.main_container = $HookUIMainContainer;
