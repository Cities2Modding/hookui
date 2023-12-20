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