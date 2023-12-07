import React from 'react'
import {$Panel} from 'hookui-framework'

const loadExtensions = (extensions) => {
    extensions.forEach(extension => {
        const script = document.createElement('script');
        script.src = "Extensions/" + extension;
        script.async = true;
        script.className = "hookui_extension"; // Assign a class name
        document.head.appendChild(script);
    });
};

const $Loader = ({ react }) => {
    const [visibleComponents, setVisibleComponents] = react.useState([])

    react.useEffect(() => {
        const handleEvent = (e) => {
            const {id, type} = e.detail
            if (visibleComponents.includes(id)) {
                setVisibleComponents(visibleComponents.filter(id_b => id !== id_b))
            } else {
                setVisibleComponents(visibleComponents => [...visibleComponents, id]);
            }
        }

        window.addEventListener('hookui', handleEvent)
        return () => {
            window.removeEventListener('hookui', handleEvent)
        };
    }, [visibleComponents])

    react.useEffect(() => {
        console.log('listening to avilable extensions')
        engine.on('hookui.available_extensions.update', (extensions) => {
            console.log('These are extensions we need to auto load:', extensions);
            loadExtensions(extensions);
        })
        engine.trigger('hookui.available_extensions.subscribe');

        return () => {
            engine.trigger('hookui.available_extensions.unsubscribe')
            document.querySelectorAll('head script.hookui_extension').forEach(script => {
                document.head.removeChild(script);
            });
        }
    }, [])

    const panels = Object.keys(window._$hookui.__registeredPanels)
    .filter(i => visibleComponents.includes(i))
    .map(k => window._$hookui.__registeredPanels[k])

    const to_render = panels.map(p => {
        if (p.component) {
            const el = React.createElement(p.component, {react: react})
            return <div key={p.id}>
                {el}
            </div>
        } else if (p.body) {
            const el = React.createElement(p.body, {react: react})
            return <$Panel key={p.id} title={p.name} react={react}>
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