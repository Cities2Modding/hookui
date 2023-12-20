import './helpers/_dom.js';
import './systems/_bindings.js';
import './systems/_events.js';
import './systems/_plugins.js';

/**
 * Core HookUI system for loading plugins and routing events.
 */
class HookUI {
    static #initialised = false;

    /**
     * Load the HookUI system.
     */
    static load() {
        if (this.#initialised)
            return;
        HookUIEvents.load();
        HookUIBindings.load();
        HookUIDOM.load();
        this.#initialised = true;
    }

    /**
     * Unload the HookUI system.
     */
    static unload() {
        if (!this.#initialised)
            return;
        HookUIEvents.unload();
        HookUIBindings.unload();
        HookUIDOM.unload();
    }

    /**
     * Get a plugin by id
     * @param {string} id - The ID of the plugin
     * @return {HookUIPlugin} A single HookUIPlugin instance
     */
    static getPlugin(id) {
        return HookUIPlugins.getPlugin(id);
    }

    /**
     * Get plugins, optionally filter by type
     * @param {string|null} type - Filter the plugins by a type specified in PluginType
     * @return {Array<HookUIPlugin>} Array of plugins, possibly filtered by type
     */
    static getPlugins(type = null) {
        return HookUIPlugins.getPlugins(type);
    }

    /**
     * Registers a plugin with the given configuration
     * @param {HookUIPlugin} plugin - Configuration object for the plugin
     */
    static register(config) {
        HookUIPlugins.register(config);
    }

    /**
     * Unregisters a plugin
     * @param {string} id - The ID for the plugin
     */
    static unregister(id) {
        HookUIPlugins.unregister(id);
    }

    /**
     * Trigger an event type
     * @param {string} eventType - The event type to trigger
     * @param {object} payload - The payload for the event
     */
    static trigger(eventType, payload) {
        HookUIEvents.dispatchEvent(eventType, payload);
    }

    /**
     * Toggles the visibility of the plugin with the given ID
     * @param {string} id - The ID of the plugin to toggle
     */
    static toggle(id) {
        this.trigger("toggle_visibility", { id });
    }

    /**
     * Play a UI sound effect
     * @param {string} sound - The name of the sound to use
     */
    static playSound(sound = "select-item") {
        engine.trigger("audio.playSound", sound, 1);
    }

    /**
     * Play a panel open/close sound effect
     * @param {boolean} isOpen - If true plays the open sound, otherwise close sound
     */
    static playPanelSound(isOpen) {
        HookUI.playSound(isOpen ? "open-panel" : "close-panel");
    }

    /**
     * Play a menu open/close sound effect
     * @param {boolean} isOpen - If true plays the open sound, otherwise close sound
     */
    static playMenuSound(isOpen) {
        HookUI.playSound(isOpen ? "open-menu" : "close-menu");
    }

    /**
     * Play the UI hover sound effect
     */
    static playHoverSound() {
        HookUI.playSound("hover-item");
    }
}

// The GameFace engine object isn't immediately available so we have to do this
var engineCheck = setInterval(function () {
    if (typeof engine !== "undefined" && typeof engine.whenReady !== "undefined") {
        // Ensure we wait for the engine to be fully ready, i.e. bindings etc available
        engine.whenReady.then(() => {
            HookUI.load();
        });

        clearInterval(engineCheck);
    }
}, 10);

export { HookUI as default };
