/**
 * Core HookUI log system.
 */
class HookUILogger {
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
}
/**
 * Provides helper methods for setting up common functionality around
 * floating elements like tooltips, dropdowns etc.
 */
class HookUIDOM {
    static #PORTAL_CONTAINER_NAME = "hookui-portal-container";
    static clickListeners = [];

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
        HookUIDOM.clickListeners.forEach((listener) =>
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
}
/**
 * The types of plugin injection points available
 */
/* eslint-disable no-unused-vars */
class HookUIPluginType {
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
}
/**
 * Represents a single HookUI plugin
 */
/* eslint-disable no-unused-vars */
class HookUIPlugin {
    id;
    type;
    name;
    icon;
    description;
    component;
    style;
    isOpen = false;
    #isOpenBindingPromise;
    #notReceivedFirstUpdate = true;

    /**
     * Setup a plugin's bindings
     */
    load() {
        this.#isOpenBindingPromise = HookUIBindings.subscribe(`hookui.${this.id}.isPluginOpen`, this.#onPluginOpen);
    }

    /**
     * Unload a plugin's bindings
     */
    unload() {
        if (!this.#isOpenBindingPromise)
            return;
        this.#isOpenBindingPromise.unsubscribe();
    }

    /**
     * Occurs when a plugin is opened
     * @param {boolean} isOpen - Whether the plugin is open
     */
    #onPluginOpen = (isOpen) => {
        if (this.isOpen !== isOpen || this.#notReceivedFirstUpdate) {
            this.isOpen = isOpen;

            const plugin = this;

            if (!this.#notReceivedFirstUpdate)
                HookUI.playPanelSound(isOpen);

            HookUIEvents.dispatchEvent("onPluginOpen", {
                plugin,
                isOpen
            });

            this.#notReceivedFirstUpdate = false;
        }
    }
}
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
/**
 * Class representing a binding promise for subscribing to engine events.
 */
class HookUIBindingPromise {
    /**
     * Creates a BindingPromise.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {Function} onBackendUpdate - The callback to execute when the event is triggered on the backend.
     * @param {Function} [onFrontendUpdate=null] - The callback to execute when the event is triggered on the client.
     * @param {boolean} [isUpdateBinding=true] - Determines if the subscription is for an update binding.
     */
    constructor(eventName, onBackendUpdate, onFrontendUpdate = null, isUpdateBinding = true) {
        this.eventName = eventName;
        this.onBackendUpdate = onBackendUpdate;
        this.onFrontendUpdate = onFrontendUpdate;
        this.isUpdateBinding = isUpdateBinding;
        this.subscription = null;
        this.isSubscribed = false;
    }

    /**
     * Sets up the event subscription if it has not already been set up.
     */
    makeAvailable() {
        if (!this.isSubscribed) {
            this.subscription = engine.on(this.isUpdateBinding ? `${this.eventName}.update` : this.eventName, this.onBackendUpdate);
            engine.trigger(`${this.eventName}.subscribe`);

            if (this.onFrontendUpdate)
                window.addEventListener(`${this.eventName}.clientUpdate`, this.onFrontendUpdate);

            this.isSubscribed = true;
        }
    }

    /**
     * Use a frontend JS event to trigger the promise being available.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {string} uniqueID - An id to identify the unique event.
     */
    makeAvailableOnEvent(eventName, uniqueID) {
        const onPromiseReceived = ( id ) =>
        {
            if (id === uniqueID) {
                this.makeAvailable(); // When the trigger is called make the outer promise available
                window.removeEventListener(eventName, onPromiseReceived);
            }
        };
        window.addEventListener(eventName, onPromiseReceived, false);
    }

    /**
     * Unsubscribes from the event and cleans up resources.
     */
    unsubscribe() {
        if (this.isSubscribed) {
            engine.trigger(`${this.eventName}.unsubscribe`);
            this.subscription.clear();

            if (this.onFrontendUpdate)
                window.removeEventListener(`${this.eventName}.clientUpdate`, this.onFrontendUpdate);

            this.isSubscribed = false;
        }
    }
}

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
        HookUIPlugins.load();
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
        HookUIPlugins.unload();
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
        engine.trigger("hookui.togglePlugin", id);
    }

    /**
     * Set the visibility of the plugin with the given ID
     * @param {string} id - The ID of the plugin to toggle
     * @param {bool} isOpen - If the plugin is open or closed
     */

    static setPluginOpen(id, isOpen) {
        engine.trigger("hookui.setPluginOpen", id, isOpen);
    }

    /**
     * Setup a plugin type (When React is loaded)
     * @param {string} type - The plugin type
     */
    static setupPluginType(type) {
        engine.trigger("hookui.setupPluginType", type);
    }

    /**
     * Toggle a plugin type group panel
     * @param {string} type - The plugin type
     * @param {bool} isOpen - If the panel is open or closed
     */
    static togglePluginType(type, isOpen) {
        engine.trigger(`hookui.${type}.togglePluginType`, isOpen);
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
window._$hookui.registerPanel = ({ id, name, icon, component, body, panel_style, type }) => {
    HookUI.register({ id, name, icon, component, body, style: panel_style, type });
};