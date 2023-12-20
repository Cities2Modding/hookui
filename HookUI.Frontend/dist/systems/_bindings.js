import '../_logger.js';
import './_plugins.js';
import './_events.js';

/**
 * Handles setup of bindings and optional client-side events to assist.
 */
/* eslint-disable no-unused-vars */
class HookUIBindings {
    static #subscriptions = new Map();
    static #EVENT_PREFIX = "hookui";
    static #availableExtensionsBinding = null;
    static #gameShowBinding = null;

    static PLUGINS_LIST = `${this.#EVENT_PREFIX}.available_extensions`;
    static PLUGIN_TYPE_OPEN = `${this.#EVENT_PREFIX}.isPluginTypeOpen`;

    // Built in game events
    static GAME_SHOW_PANEL = "onGameShowPanel";
    static #BACKEND_GAME_SHOW_PANEL = "game.showPanel";

    /**
     * Subscribe to events triggered by the backend
     */
    static load() {
        HookUILogger.log("Listening for available extensions.");

        const bindingName = `${this.#EVENT_PREFIX}.available_extensions`;

        this.#availableExtensionsBinding = HookUIBindings.subscribe(bindingName, (plugins) => {
            HookUILogger.log(`These are extensions we need to auto load: ${plugins}`);
            HookUIPlugins.injectScripts(plugins);
        });
        this.#gameShowBinding = HookUIBindings.subscribe(this.#BACKEND_GAME_SHOW_PANEL, (panel) => {
            HookUILogger.log("adasdsaasdads");
            HookUIEvents.dispatchEvent("onGameShowPanel", panel);
        });
    }

    /**
     * Unsubscribe to events triggered by the backend
     */
    static unload() {
        window.removeEventListener("unload", HookUIBindings.unload);

        HookUIBindings.unsubscribe(HookUIBindings.PLUGINS_LIST, this.#availableExtensionsBinding);
        HookUIBindings.unsubscribe(this.#BACKEND_GAME_SHOW_PANEL, this.#gameShowBinding);

        document.querySelectorAll("head script.hookui_extension").forEach(script => {
            document.head.removeChild(script);
        });
    }

    /**
     * Subscribe to an engine trigger update binding
     * @param {string} eventName - The engine event name
     * @param {Event} onUpdate - The callback to execute
     * @param {bool} isUpdateBinding - If set to false, will exclude .update on the binding name
     * @param {bool} useClientEvent - If set to true, a client-side event will be setup to pre-emptively trigger updates to reduce UI delay
     * @return {object} The subscription handle (Used to unsubscribe)
     */
    static subscribe(eventName, onUpdate, isUpdateBinding = true, useClientEvent = false) {
        var subscription = engine.on(isUpdateBinding ? `${eventName}.update` : eventName, onUpdate);

        engine.trigger(`${eventName}.subscribe`);

        if (useClientEvent)
            window.addEventListener(`${eventName}.preEngineUpdate`, onUpdate);

        this.#subscriptions.set(eventName, { handle: subscription, callback: onUpdate });

        return subscription;
    }

    /**
     * Unsubscribe to an engine trigger update binding
     * @param {string} eventName - The engine event name
     * @param {object} handle - The subscription handle
     * @param {Event} onUpdate - The callback that was used
     */
    static unsubscribe(eventName, handle, onUpdate) {
        engine.trigger(`${eventName}.unsubscribe`);
        handle.clear();

        if (onUpdate)
            window.removeEventListener(`${eventName}.preEngineUpdate`, onUpdate);
    }

    /**
     * Subscribe to game panel show events
     */
    static subscribeGamePanel(callback) {
        return HookUIBindings.subscribe(this.#BACKEND_GAME_SHOW_PANEL, (panel) => {
            if (callback)
                callback(panel);
        }, false);
    }

    /**
     * Unsubscribe to game panel show events
     */
    static unsubscribeGamePanel(binding) {
        HookUIBindings.unsubscribe(this.#BACKEND_GAME_SHOW_PANEL, binding);
    }
}

export { HookUIBindings as default };
