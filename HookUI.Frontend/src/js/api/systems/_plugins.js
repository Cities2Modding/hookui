import "../_logger";
import "../plugins/_plugin-types";
import "../plugins/_plugin";
import "../systems/_events";

/**
 * Handles plugin management
 */
// eslint-disable-next-line no-unused-vars
class HookUIPlugins {
    static #plugins = new Map();

    /**
     * Load the plugin system
     */
    static load() {        
        HookUIEvents.register("onPluginAvailable", this.#onPluginAvailable);
        HookUIEvents.register("toggle_visibility", this.#onToggleVisibility);        
    }

    /**
     * Unload the plugin system
     */
    static unload() {
        this.#plugins.forEach((plugin, key, map) => {
            plugin.unsubscribe();
        });

        HookUIEvents.unregister("onPluginAvailable", this.#onPluginAvailable);
        HookUIEvents.unregister("toggle_visibility", this.#onToggleVisibility); 
    }

    /**
     * Occurs when a plugin is fully registered
     * @param {object} detail - The detail object
     */
    static #onPluginAvailable = (detail) => {
        if (!detail || !this.#plugins.has(detail.id))
            return;

        let plugin = this.#plugins.get(detail.id);
        plugin.load();
    }

    /**
     * Occurs when a toggle visibility event has triggered for a plugin
     * @param {object} detail - The detail object
     */
    static #onToggleVisibility = (detail) => {
        if (!detail || !this.#plugins.has(detail.id))
            return;

        HookUI.toggle(detail.id);
    }

    /**
     * Get a plugin by id
     * @param {string} id - The ID of the plugin
     * @return {HookUIPlugin} A plugin instance
     */
    static getPlugin(id) {
        if (!this.#plugins.has(id))
            return null;

        return this.#plugins.get(id);
    }

    /**
     * Get plugins, optionally filter by type
     * @param {string|null} type - Filter the plugins by a type specified in PluginType
     * @return {Array<HookUIPlugin>} Array of plugins, possibly filtered by type
     */
    static getPlugins(type = null) {
        if (type === null)
            return Array.from(this.#plugins.values());

        return Array.from(this.#plugins.values()).filter(plugin => (plugin.type === type || plugin.type == "Legacy" && type === "InfoPanel"));
    }

    /**
     * Check if a plugin type has plugins
     * @param {string|null} type - Filter the plugins by a type specified in PluginType
     * @return {HookUIPlugin} A plugin instance
     */
    static hasPlugins(type) {
        const plugins = HookUIPlugins.getPlugins(type);
        return plugins && plugins.length > 0;
    }

    /**
     * Registers a plugin with the given configuration
     * @param {HookUIPlugin} plugin - Configuration object for the plugin
     */
    static register(config) {
        const plugin = new HookUIPlugin();
        plugin.id = config.id;
        plugin.name = config.name;
        plugin.icon = config.icon;
        plugin.style = config.style;

        if (config.body !== undefined) {
            plugin.component = config.body;
        }
        else {
            plugin.component = config.component;
        }

        // If no config type is provided it's a legacy plugin
        if (config.type !== undefined)
            plugin.type = config.type;
        else
            plugin.type = HookUIPluginType.LEGACY;

        this.#plugins.set(plugin.id, plugin);

        engine.trigger("hookui.setupPlugin", config.id);
        HookUILogger.log(`Registered plugin '${plugin.id}' with name '${plugin.name}' and type '${plugin.type}.`);
    }

    /**
     * Unregisters a plugin
     * @param {string} id - The ID for the plugin
     */
    static unregister(id) {
        if (!this.#plugins.has(id)) {
            HookUILogger.log(`Failed to remove plugin with id '${id}', it is not currently registered.'`);
            return;
        }
        this.#plugins.delete(id);
        HookUILogger.log(`Removed plugin with id ${id}.`);
    }

    /**
     * Inject the plugin JavaScript dependencies
     * @param {Array<string>} plugins - An array of plugin JS files
     */
    static injectScripts(plugins) {
        if (!plugins || plugins.length == 0)
            return;

        plugins.forEach(plugin => {
            const script = document.createElement("script");
            script.src = "Extensions/" + plugin;
            script.async = true;
            script.className = "hookui_extension"; // Assign a class name
            document.head.appendChild(script);
        });
    }

    /**
     * Setup a plugin type for use in a React component
     * @param {string} type - The type specified in PluginType
     */
    static useType(react, type, onInitialise, onOpen) {
        const onPluginAvailable = (detail) => {
            if (!detail)
                return;
            onInitialise(HookUIPlugins.hasPlugins(type));
        };

        const onPluginTypeOpen = (detail) => {
            if (detail.type !== type)
                return;
            onOpen(detail.isOpen);
        };

        react.useEffect(() => {
            if (onInitialise)
                HookUIEvents.register("onPluginAvailable", onPluginAvailable);

            if (onOpen)
                HookUIEvents.register(type, onPluginTypeOpen);

            HookUI.setupPluginType(type);
            return () => {

                if (onInitialise)
                    HookUIEvents.unregister("onPluginAvailable", onPluginAvailable);

                if (onOpen)
                    HookUIEvents.unregister(type, onPluginTypeOpen);
            };
        }, []);
    }

    /**
     * Setup plugins for use in a React component PluginType container
     * @param {string} type - The type specified in PluginType
     */
    static use(react, type, onUpdated) {
        const onPluginOpen = (detail) => {
            if (!detail)
                return;

            const plugins = HookUIPlugins.getPlugins(type).filter(p => p.isOpen == true);

            if (plugins && plugins.length > 0)
                onUpdated(plugins);
        };

        react.useEffect(() => {
            HookUIEvents.register("onPluginOpen", onPluginOpen);
            return () => {
                HookUIEvents.unregister("onPluginOpen", onPluginOpen);
            };
        }, []);
    }
}