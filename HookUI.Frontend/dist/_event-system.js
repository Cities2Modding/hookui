(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Handles routing of HookUI events
 */
class HookUIEventSystem {
    static #EVENT_PREFIX = "hookui";
    static #eventListeners = new Map();
    static #availableExtensionsBinding = null;
    static #gameShowBinding = null;
    static #pluginTypeOpenBinding = null;

    // Client side events
    static #ON_PLUGIN_TOGGLE = `${this.#EVENT_PREFIX}.onPluginToggle`;

    // Bindings registered in .NET
    static PLUGINS_LIST = `${this.#EVENT_PREFIX}.available_extensions`;
    static PLUGIN_TYPE_OPEN = `${this.#EVENT_PREFIX}.isPluginTypeOpen`;

    // Built in game events
    static GAME_SHOW_PANEL = "onGameShowPanel";
    static #GAME_SHOW_PANEL = "game.showPanel";

    /**
     * Load the HookUI system
     */
    static load() {
        window.addEventListener(this.#ON_PLUGIN_TOGGLE, this.#onToggleEvent);

        // Add a listener for window unload to cleanup events etc
        window.addEventListener("unload", this.#onWindowUnloaded);

        this.#configure();
        this.#subscribeToEngine();
    }

    /**
     * Unload the HookUI system
     */
    static unload() {
        window.removeEventListener(this.#ON_PLUGIN_TOGGLE, this.#onToggleEvent);
        this.#eventListeners.clear();
        this.#unsubscribeToEngine();
    }

    /**
     * Occurs when the window is unloaded
     */
    static #onWindowUnloaded(event) {
        this.unload();
    }

    /**
     * Configure the HookUI system
     */
    static #configure() {
        // Initialise the maps for each type of plugin
        HookUIPluginType.ALL.forEach((pluginType) => {
            this.#eventListeners.set(pluginType, []);
        });
    }

    /**
     * Register an event listener for a specific event type
     * @param {string} type - The event type
     * @param {Function} callback - The callback function to register
     */
    static register(type, callback) {
        if (!this.#eventListeners.has(type)) {
            HookUILogger.warn(`Tried to register event listener for an unknown type '${type}'.`);
            return;
        }
        if (!callback) {
            HookUILogger.warn(`Tried to register event listener with an invalid callback for '${type}'.`);
            return;
        }
        var currentEventListeners = this.#eventListeners.get(type);
        currentEventListeners.push(callback);
    }

    /**
     * Unregister an event listener for a specific event type
     * @param {string} type - The event type
     * @param {Function} callback - The callback function to register
     */
    static unregister(type, callback) {
        if (!this.#eventListeners.has(type)) {
            HookUILogger.warn(`Tried to unregister event listener for an unknown type '${type}'.`);
            return;
        }
        if (!callback) {
            HookUILogger.warn(`Tried to unregister event listener with an invalid callback for '${type}'.`);
            return;
        }
        var currentEventListeners = this.#eventListeners.get(type);
        const callbackIndex = currentEventListeners.findIndex(cb => cb === callback);

        if (callbackIndex === -1) {
            HookUILogger.warn(`Tried to unregister a non-existent callback for type '${type}'.`);
            return;
        }

        currentEventListeners.splice(callbackIndex, 1);
    }

    /**
     * HookUI event handler that routes to the appropriate listeners
     * @param {CustomEvent} e - The event payload
     */
    static #onToggleEvent(e) {
        const { type } = e.detail;

        if (!this.#eventListeners.has(type)) {
            HookUILogger.warn(`Received event for an unknown type '${type}'.`);
            return;
        }

        this.#eventListeners[type].forEach((callback) => {
            callback(e.detail);
        });
    }

    /**
     * Dispatch a HookUI event
     * @param {string} eventType - The event type
     * @param {object} detail - The payload for the event
     */
    static dispatchEvent(eventType, detail) {
        const eventDetail = { type: eventType, ...detail };
        const event = new CustomEvent(this.#EVENT_PREFIX, { detail: eventDetail });
        window.dispatchEvent(event);
    }

    /**
     * Subscribe to events triggered by the backend
     */
    static #subscribeToEngine() {
        HookUILogger.log("Listening for available extensions.");

        const bindingName = `${this.#EVENT_PREFIX}.available_extensions`;

        this.#availableExtensionsBinding = HookUIEventSystem.subscribeBinding(bindingName, (plugins) => {
            HookUILogger.log(`These are extensions we need to auto load: ${plugins}`);
            HookUIPluginSystem.injectScripts(plugins);
        });
        this.#gameShowBinding = HookUIEventSystem.subscribeBinding(this.#GAME_SHOW_PANEL, (panel) => {
            HookUILogger.log("adasdsaasdads");
            HookUIEventSystem.dispatchEvent("onGameShowPanel", panel);
        });
        this.#subscribePluginOpen();
    }

    /**
     * Unsubscribe to events triggered by the backend
     */
    static #unsubscribeToEngine(event) {
        window.removeEventListener("unload", this.#unsubscribeToEngine);

        HookUIEventSystem.unsubscribeBinding(HookUIEventSystem.PLUGINS_LIST, this.#availableExtensionsBinding);
        HookUIEventSystem.unsubscribeBinding(this.#GAME_SHOW_PANEL, this.#gameShowBinding);

        document.querySelectorAll('head script.hookui_extension').forEach(script => {
            document.head.removeChild(script);
        });

        this.#unsubscribePluginOpen();
    }

    /**
     * Subscribe to the isPluginTypeOpen trigger bindings
     */
    static #subscribePluginOpen() {
        this.#pluginTypeOpenBinding = HookUIEventSystem.subscribeBinding(HookUIEventSystem.PLUGIN_TYPE_OPEN, (pluginType, isOpen) => {
            if (pluginType !== HookUIPluginType.INFO_PANEL)
                return;
            setShowMenu(isOpen);
        });
    }

    /**
     * Unsubscribe to the isPluginTypeOpen trigger bindings
     */
    static #unsubscribePluginOpen() {
        HookUIEventSystem.unsubscribeBinding(HookUIEventSystem.PLUGIN_TYPE_OPEN, this.#pluginTypeOpenBinding);
    }

    /**
     * Subscribe to an engine trigger update binding
     * @param {string} eventName - The engine event name
     * @return {object} The subscription handle (Used to unsubscribe)
     */
    static subscribeBinding(eventName, onUpdate) {
        var subscription = engine.on(`${eventName}.update`, (data) => {
            onUpdate && onUpdate(data)
        })

        engine.trigger(`${eventName}.subscribe`);

        return subscription;
    }

    /**
     * Unsubscribe to an engine trigger update binding
     * @param {string} eventName - The engine event name
     * @param {object} handle - The subscription handle
     */
    static unsubscribeBinding(eventName, handle) {
        engine.trigger(`${eventName}.unsubscribe`)
        handle.clear()
    }

    /**
     * Execute an engine trigger
     * @param {string} eventName - The engine event name
     * @param {Array} args - The trigger arguments
     */
    static triggerEngine(eventName, ...args) {
        engine.trigger(eventName, args)
    }
}
},{}]},{},[1])