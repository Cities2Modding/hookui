(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])