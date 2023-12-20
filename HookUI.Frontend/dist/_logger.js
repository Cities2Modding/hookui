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

export { HookUILogger as default };
