import "../_logger";
import "../plugins/_plugin-types";

/**
 * Handles routing of HookUI events
 */
class HookUIEvents {
    static #EVENT_PREFIX = "hookui";
    static #bufferedEvents = [];
    static eventListeners = new Map();
    static #BUILT_IN_EVENTS = [
        "onGameShowPanel",
        "onPluginAvailable",
        "onPluginOpen",
        "toggle_visibility"
    ];

    // Client side events
    static #ON_PLUGIN_TOGGLE = `${this.#EVENT_PREFIX}.onPluginToggle`;

    /**
     * Load the HookUI event system
     */
    static load() {
        window.addEventListener(this.#EVENT_PREFIX, this.#onReceivedEvent);

        // Add a listener for window unload to cleanup events etc
        window.addEventListener("beforeunload", this.#onWindowUnloaded);

        this.#configure();
    }

    /**
     * Unload the HookUI event system
     */
    static unload() {
        window.removeEventListener(this.#EVENT_PREFIX, this.#onReceivedEvent);
        HookUIEvents.eventListeners.clear();
    }

    /**
     * Occurs when the window is unloaded (Not currently called so the game is ignoring this?
     * Does not follow the normal browser conventions, find a better way like detect when the
     * internal file watcher is about to reload and then run this via an engine trigger if we can.)
     */
    static #onWindowUnloaded = function (event) {
        this.unload();
        HookUILogger.log("Unloaded HookUI.");
    };

    /**
     * Configure the HookUI system
     */
    static #configure = function () {
        // Initialise the maps for each type of plugin
        HookUIPluginType.ALL.forEach((pluginType) => {
            HookUIEvents.eventListeners.set(pluginType, []);
        });

        this.#BUILT_IN_EVENTS.forEach(name => {
            HookUIEvents.eventListeners.set(name, []);
        });
    };

    /**
     * Register an event listener for a specific event type
     * @param {string} type - The event type
     * @param {Function} callback - The callback function to register
     */
    static register(type, callback) {
        if (!HookUIEvents.eventListeners.has(type)) {
            HookUILogger.warn(`Tried to register event listener for an unknown type '${type}'.`);
            return;
        }
        if (!callback) {
            HookUILogger.warn(`Tried to register event listener with an invalid callback for '${type}'.`);
            return;
        }
        var currentEventListeners = HookUIEvents.eventListeners.get(type);

        const hasNoPreviousListeners = currentEventListeners.length == 0;
        currentEventListeners.push(callback);

        // If we have buffered events for this type trigger them
        if (HookUIPluginType.ALL.includes(type) && hasNoPreviousListeners) {
            this.#bufferedEvents.forEach(evt => {
                if (evt.type === type)
                    HookUIEvents.dispatchEvent(evt.type, evt.detail);
            });
        }
    }

    /**
     * Unregister an event listener for a specific event type
     * @param {string} type - The event type
     * @param {Function} callback - The callback function to register
     */
    static unregister(type, callback) {
        if (!HookUIEvents.eventListeners.has(type)) {
            HookUILogger.warn(`Tried to unregister event listener for an unknown type '${type}'.`);
            return;
        }
        if (!callback) {
            HookUILogger.warn(`Tried to unregister event listener with an invalid callback for '${type}'.`);
            return;
        }
        var currentEventListeners = HookUIEvents.eventListeners.get(type);
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
    static #onReceivedEvent = function (e) {
        const { type } = e.detail;

        if (!HookUIEvents.eventListeners.has(type)) {
            HookUILogger.warn(`Received event for an unknown type '${type}'.`);
            return;
        }

        HookUIEvents.eventListeners.get(type).forEach((callback, key, map) => {
            callback(e.detail);
        });
    };

    /**
     * Dispatch a HookUI event
     * @param {string} eventType - The event type
     * @param {object} detail - The payload for the event
     */
    static dispatchEvent(eventType, detail) {
        if (!HookUIEvents.eventListeners.has(eventType)) {
            HookUILogger.warn(`Unknown event type '${eventType}'.`);
            return;
        }

        var currentEventListeners = HookUIEvents.eventListeners.get(eventType);
        const hasNoListeners = currentEventListeners.length == 0;

        // Buffer plugin type events
        if (HookUIPluginType.ALL.includes(eventType) && hasNoListeners) {
            this.#bufferedEvents.push({ type: eventType, ...detail });
        }
        else {
            const eventDetail = { type: eventType, ...detail };
            const event = new CustomEvent(this.#EVENT_PREFIX, { detail: eventDetail });
            window.dispatchEvent(event);
        }
    }

    /**
     * Execute an engine trigger
     * @param {string} eventName - The engine event name
     * @param {Array} args - The trigger arguments
     */
    static triggerEngine(eventName, ...args) {
        engine.trigger(eventName, args);
    }
}