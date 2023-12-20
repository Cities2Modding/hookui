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
