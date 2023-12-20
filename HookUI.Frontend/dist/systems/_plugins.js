import '../_logger.js';
import '../plugins/_plugin-types.js';
import '../plugins/_plugin.js';

/**
 * Handles plugin management
 */
// eslint-disable-next-line no-unused-vars
class HookUIPlugins {
    static #plugins = new Map();

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

        return Array.from(this.#plugins.values()).filter(plugin => (plugin.type === type||plugin.type == "Legacy" && type === "InfoPanel" ) );
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

            // It's a legacy component so replicate original warning
            if (config.type === undefined)
                this.#warnComponentUsage(plugin.id, plugin.name);
        }

        // If no config type is provided it's a legacy plugin
        if (config.type !== undefined)
            plugin.type = config.type;
        else
            plugin.type = HookUIPluginType.LEGACY;

        this.#plugins.set(plugin.id, plugin);
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
     * Warn of component usage in a legacy HookUI context
     * @param {string} id - The ID for the plugin
     * @param {string} name - The name for the plugin
     */
    static #warnComponentUsage(id, name) {
        console.warn(`[HookUI] ${id}:${name} is registered as a $Panel. Please pass in .body instead of .component with the children of $Panel`);
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
}

export { HookUIPlugins as default };
