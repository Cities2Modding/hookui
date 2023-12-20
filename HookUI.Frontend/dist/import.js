/**
 * Core HookUI log system.
 */
let HookUILogger$1 = class HookUILogger {
    /**
     * Log a HookUI message
     * @param {string} message - The message
     */
    static log(message) {
        console.log(`[HookUI] ${message}`);
    }

    /**
     * Log a HookUI warning message
     * @param {string} message - The message
     */
    static warn(message) {
        console.warn(`[HookUI] ${message}`);
    }
};

/**
 * Provides helper methods for setting up common functionality around
 * floating elements like tooltips, dropdowns etc.
 */
let HookUIDOM$1 = class HookUIDOM {
    static #PORTAL_CONTAINER_NAME = "hookui-portal-container";
    static #clickListeners = [];

    /**
     * Register HookUI DOM event handlers
     */
    static load() {
        document.addEventListener("click", this.#onDocumentClick, true);
    }

    /**
     * Unregister HookUI DOM event handlers
     */
    static unload() {
        document.removeEventListener("click", this.#onDocumentClick, true);
    }

    /**
     * Get or create a container for a React portal
     * @param {string|null} id - The optional ID, defaults to a HookUI container
     */
    static getPortalContainer(id = null) {
        const elementID = id ? id : this.#PORTAL_CONTAINER_NAME;

        if (!document.getElementById(elementID)) {
            const container = document.createElement("div");
            container.id = elementID;
            document.getElementsByClassName("game-main-screen_TRK")[0].appendChild(container);
            return container;
        } else {
            return document.getElementById(elementID);
        }
    }

    /**
     * Handler for when elements are clicked
     * @param {Event} event - The event object returned from click
     */
    static #onDocumentClick(event) {
        this.#clickListeners.forEach((listener) =>
        {
            if (listener)
                listener(event);
        });
    }

    /**
     * Get the position and size of a DOM element
     * @param {Element} element - The element to get the data from
     */
    static getElementRect(element)
    {
        if (element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height
            };
        }
        return {};
    }
};

/**
 * The types of plugin injection points available
 */
/* eslint-disable no-unused-vars */
let HookUIPluginType$1 = class HookUIPluginType {
    static INFO_PANEL = "InfoPanel";
    static ADVISOR_PANEL = "AdvisorPanel";
    static TOOLBAR_START = "ToolBarStart";
    static TOOLBAR_END = "ToolBarEnd";
    static MAIN_CONTAINER = "MainContainer";
    static CUSTOM = "Custom";
    static LEGACY = "Legacy";

    static ALL = [
        HookUIPluginType.INFO_PANEL,
        HookUIPluginType.ADVISOR_PANEL,
        HookUIPluginType.TOOLBAR_START,
        HookUIPluginType.TOOLBAR_END,
        HookUIPluginType.MAIN_CONTAINER,
        HookUIPluginType.CUSTOM,
        HookUIPluginType.LEGACY
    ];
};

/**
 * Represents a single HookUI plugin
 */
/* eslint-disable no-unused-vars */
let HookUIPlugin$1 = class HookUIPlugin {
    id;
    type;
    name;
    icon;
    description;
    component;
    style;
};

/**
 * Handles routing of HookUI events
 */
let HookUIEvents$1 = class HookUIEvents {
    static #EVENT_PREFIX = "hookui";
    static #eventListeners = new Map();

    // Client side events
    static #ON_PLUGIN_TOGGLE = `${this.#EVENT_PREFIX}.onPluginToggle`;

    /**
     * Load the HookUI event system
     */
    static load() {
        window.addEventListener(this.#ON_PLUGIN_TOGGLE, this.#onToggleEvent);

        // Add a listener for window unload to cleanup events etc
        window.addEventListener("beforeunload", this.#onWindowUnloaded);

        this.#configure();
    }

    /**
     * Unload the HookUI event system
     */
    static unload() {
        window.removeEventListener(this.#ON_PLUGIN_TOGGLE, this.#onToggleEvent);
        this.#eventListeners.clear();
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
            this.#eventListeners.set(pluginType, []);
            console.log("Added event listener for " + pluginType);
        });

        this.#eventListeners.set("onGameShowPanel", []);
    };

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
    static #onToggleEvent = function (e) {
        const { type } = e.detail;

        if (!this.#eventListeners.has(type)) {
            HookUILogger.warn(`Received event for an unknown type '${type}'.`);
            return;
        }

        this.#eventListeners[type].forEach((callback) => {
            callback(e.detail);
        });
    };

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
     * Execute an engine trigger
     * @param {string} eventName - The engine event name
     * @param {Array} args - The trigger arguments
     */
    static triggerEngine(eventName, ...args) {
        engine.trigger(eventName, args);
    }
};

/**
 * Handles plugin management
 */
// eslint-disable-next-line no-unused-vars
let HookUIPlugins$1 = class HookUIPlugins {
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
};

/**
 * Handles setup of bindings and optional client-side events to assist.
 */
/* eslint-disable no-unused-vars */
let HookUIBindings$1 = class HookUIBindings {
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
};

/**
 * Core HookUI system for loading plugins and routing events.
 */
let HookUI$1 = class HookUI {
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
};

// The GameFace engine object isn't immediately available so we have to do this
var engineCheck = setInterval(function () {
    if (typeof engine !== "undefined" && typeof engine.whenReady !== "undefined") {
        // Ensure we wait for the engine to be fully ready, i.e. bindings etc available
        engine.whenReady.then(() => {
            HookUI$1.load();
        });

        clearInterval(engineCheck);
    }
}, 10);

/**
-----------------------------------------------------------------------------------
 * Ensure old HookUI functions are setup to redirect to the new instances.
-----------------------------------------------------------------------------------
 * registerPanel works with two different types of panels, for legacy reasons
 * You should pass in .body normally in order to set what elements inside of the
 * $Panel component should be
 * Correct Syntax:
 * window._$hookui.registerPanel({
 *     id: "example.city-monitor",
 *     name: "City Monitor",
 *     icon: "Media/Game/Icons/BuildingLevel.svg",
 *     body: <div>This is inside the $Panel</div>,
 * })
 * Initially though, .component was accepted and should in that case be the $Panel
 * itself. It wasn't correct though, as the $Panel should be managed by HookUI
 * instead of by the mod authors.
 * Legacy Syntax (Don't use this unless you must):
 * window._$hookui.registerPanel({
 *     id: "example.city-monitor",
 *     name: "City Monitor",
 *      icon: "Media/Game/Icons/BuildingLevel.svg",
 *     component: <$Panel title="City Monitor">This is my very own panel</$Panel>,
 * })
 */

window._$hookui = {};

window._$hookui.__registeredPanels = {};

/**
 * Register a plugin
 */
window._$hookui.registerPanel = ({ id, name, icon, component, body, panel_style }) => {
    HookUI.register({ id, name, icon, component, body, style: panel_style });
};
