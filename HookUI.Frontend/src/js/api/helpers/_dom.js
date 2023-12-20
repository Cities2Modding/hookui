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