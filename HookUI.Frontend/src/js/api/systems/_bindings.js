import "../_logger";
import "../systems/_plugins";
import "../systems/_events";
import "./_binding-promise";

/**
 * Handles setup of bindings and optional client-side events to assist.
 */
/* eslint-disable no-unused-vars */
class HookUIBindings {
    static #EVENT_PREFIX = "hookui";
    static #availableExtensionsPromise = null;
    static #pluginTypeOpenPromises = [];
    static #gameShowPromise = null;

    static PLUGINS_LIST = `${this.#EVENT_PREFIX}.availablePlugins`;
    static PLUGIN_TYPE_OPEN = `${this.#EVENT_PREFIX}.isPluginTypeOpen`;

    // Built in game events
    static GAME_SHOW_PANEL = "onGameShowPanel";
    static #BACKEND_GAME_SHOW_PANEL = "game.showPanel";

    /**
     * Subscribe to events triggered by the backend
     */
    static load() {
        HookUILogger.log("Listening for available plugins...");        

        this.#availableExtensionsPromise = HookUIBindings.subscribe(HookUIBindings.PLUGINS_LIST, (plugins) => {
            HookUILogger.log(`These are plugins we need to auto load: ${plugins}`);
            HookUIPlugins.injectScripts(plugins);
        });
        HookUIPluginType.ALL.forEach((pluginType) => {
            const bindingName = `hookui.${pluginType}.isPluginTypeOpen`;
            this.#pluginTypeOpenPromises.push(HookUIBindings.subscribe(bindingName, (isOpen) => {
                HookUIEvents.dispatchEvent(pluginType, { isOpen });
            }));
        });
        this.#gameShowPromise = HookUIBindings.subscribeGamePanel((panel) => {
            HookUIEvents.dispatchEvent("onGameShowPanel", { panel });
        });
    }

    /**
     * Unsubscribe to events triggered by the backend
     */
    static unload() {
        window.removeEventListener("unload", HookUIBindings.unload);
        this.#availableExtensionsPromise.unsubscribe();
        this.#pluginTypeOpenPromises.forEach(bindingPromise => bindingPromise.unsubscribe());
        this.#gameShowPromise.unsubscribe();

        document.querySelectorAll("head script.hookui_extension").forEach(script => {
            document.head.removeChild(script);
        });
    }

    /**
     * Subscribe to an engine trigger update binding
     * @param {string} eventName - The engine event name
     * @param {Event} onBackendUpdate - The callback to execute when the backend propagates update
     * @param {Event} [onFrontendUpdate=null] - The callback to execute when the frontend propagates update
     * @param {bool} [isUpdateBinding=true] - If set to false, will exclude .update on the binding name
     * @return {HookUIBindingPromise} The binding promise, should be used to also unsubscribe.
     */
    static subscribe(eventName, onBackendUpdate, onFrontendUpdate = null, isUpdateBinding = true) {
        let bindingPromise = new HookUIBindingPromise(eventName, onBackendUpdate, onFrontendUpdate, isUpdateBinding);
        bindingPromise.makeAvailable();
        return bindingPromise;
    }

    /**
     * Subscribe to game panel show events
     * @return {HookUIBindingPromise} bindingPromise - The binding promise, should be used to also unsubscribe.
     */
    static subscribeGamePanel(callback) {
        return HookUIBindings.subscribe(this.#BACKEND_GAME_SHOW_PANEL, (panel) => {
            if (callback)
                callback(panel);
        }, null, false);
    }
}