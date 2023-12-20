// Yes, the filename is clearly fun and incidental, HookUI-UISystem
using Colossal.Annotations;
using Colossal.AssetPipeline;
using Colossal.UI.Binding;
using Game.SceneFlow;
using Game.UI;
using Game.UI.InGame;
using HookUI.UI.Extensions;
using HookUI.Writers;
using HookUILib.Core;
using System;
using System.Collections.Generic;
using System.Reflection;
using Unity.Collections;

namespace HookUI.UI
{
    public class HookUIUISystem : UISystemBase
    {
        private const string UI_GROUP = "hookui";

        private Dictionary<ExtensionType, bool> PluginTypeVisibility
        {
            get;
            set;
        } = new Dictionary<ExtensionType, bool> 
        {
            { ExtensionType.InfoPanel, false },
            { ExtensionType.AdvisorPanel, false },
            { ExtensionType.ToolBarStart, false },
            { ExtensionType.ToolBarEnd, false },
            { ExtensionType.MainContainer, false },
            { ExtensionType.Custom, false },
            { ExtensionType.Panel, false },
        };

        private Dictionary<string, bool> PluginVisibility
        {
            get;
            set;
        } = new Dictionary<string, bool>( );


        private HashSet<string> RegisteredPlugins
        {
            get;
            set;
        } = new HashSet<string>( );        

        private readonly ExtensionLoader _extensionLoader = new ExtensionLoader();

        protected override void OnCreate( )
        {
            base.OnCreate( );

            _extensionLoader.Load( );

            SetupLegacyBindings( );
            SetupBindings( );
        }

        /// <summary>
        /// Setup legacy compatibility bindings
        /// </summary>
        [Obsolete( "Should be removed in the future" )]
        private void SetupLegacyBindings( )
        {
            // Make available in UI which extensions we've found via C# reflection
            AddUpdateBinding( new GetterValueBinding<HashSet<string>>( UI_GROUP, "available_extensions", ( ) =>
            {
                return _extensionLoader.Extensions;
            }, new HashSetWriter<string>( ) ) );

            // Share the state of menu visibility to the Game UI
            AddUpdateBinding( new GetterValueBinding<bool>( UI_GROUP, "is_menu_open", ( ) =>
            {
                return PluginTypeVisibility[ExtensionType.Panel];
            } ) );

            // Allow the UI to call `hookui.toggle_menu <bool>` to toggle menu
            AddBinding( new TriggerBinding<bool>( UI_GROUP, "toggle_menu", ( isOpen ) =>
            {
                PluginTypeVisibility[ExtensionType.Panel] = isOpen;
            } ) );
        }

        /// <summary>
        /// Setup bindings
        /// </summary>
        private void SetupBindings( )
        {
            // Make available in UI which extensions we've found via C# reflection
            AddUpdateBinding( new GetterValueBinding<HashSet<string>>( UI_GROUP, "availablePlugins", ( ) =>
            {
                return _extensionLoader.Extensions;
            }, new HashSetWriter<string>( ) ) );

            // Generate an update binding for each extension type
            foreach ( ExtensionType extensionType in Enum.GetValues( typeof( ExtensionType ) ) )
            {
                var extensionTypeString = extensionType == ExtensionType.Panel ? "Legacy" : extensionType.ToString();

                // Share the state of menu visibility to the Game UI
                AddUpdateBinding( new GetterValueBinding<bool>( UI_GROUP, $"{extensionTypeString}.isPluginTypeOpen", ( ) =>
                {
                    return PluginTypeVisibility[extensionType];
                } ) );

                AddBinding( new TriggerBinding<bool>( UI_GROUP, $"{extensionTypeString}.togglePluginType", ( isOpen ) =>
                {
                    PluginTypeVisibility[extensionType] = isOpen;
                } ) );
            }

            AddBinding( new TriggerBinding<string, bool>( UI_GROUP, "setPluginOpen", ( id, isOpen ) =>
            {
                PluginVisibility[id] = isOpen;
            } ) );

            AddBinding( new TriggerBinding<string>( UI_GROUP, "togglePlugin", ( id ) =>
            {
                PluginVisibility[id] = !PluginVisibility[id];
            } ) );

            AddBinding( new TriggerBinding<string>( UI_GROUP, "setupPluginType", SetupPluginType ) );
            AddBinding( new TriggerBinding<string>( UI_GROUP, "setupPlugin", SetupPlugin ) );
        }

        /// <summary>
        /// Occurs when a plugin type is registered in React
        /// </summary>
        private void SetupPluginType( string pluginType )
        {
            if ( Enum.TryParse<ExtensionType>( pluginType, out var pt ) )
            {
                // If the plugin type is already visible ensure it propagates back
                if ( PluginTypeVisibility[pt] )
                {
                    var extensionTypeString = pt == ExtensionType.Panel ? "Legacy" : pt.ToString( );
                    var js = $@"HookUIEvents.dispatchEvent('{extensionTypeString}',{{isOpen:true}});";
                    GameManager.instance.userInterface.view.View.ExecuteScript( js );
                }
            }
        }

        /// <summary>
        /// We have to do this because mods aren't consistent with the C# id and the JS id
        /// </summary>
        /// <param name="id"></param>
        private void SetupPlugin( string id )
        {
            if ( string.IsNullOrEmpty( id ) )
                return;

            if ( !PluginVisibility.ContainsKey( id ) )
                PluginVisibility.Add( id, false );

            // We don't want to keep adding new bindings if JS is reloaded for example.
            if ( !RegisteredPlugins.Contains( id ) )
            {
                AddUpdateBinding( new GetterValueBinding<bool>( UI_GROUP, $"{id}.isPluginOpen", ( ) =>
                {
                    return PluginVisibility[id];
                } ) );
                RegisteredPlugins.Add( id );
            }

            var js = $@"HookUIEvents.dispatchEvent('onPluginAvailable',{{id:'{id}', isOpen: {PluginVisibility[id].ToString().ToLowerInvariant()}}});";
            GameManager.instance.userInterface.view.View.ExecuteScript( js );
        }
    }
}
