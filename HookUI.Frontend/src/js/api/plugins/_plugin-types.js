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