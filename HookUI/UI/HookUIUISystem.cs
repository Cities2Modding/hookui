// Yes, the filename is clearly fun and incidental, HookUI-UISystem
using Colossal.UI.Binding;
using Game.UI;
using HookUI.UI.Extensions;
using HookUI.Writers;
using System.Collections.Generic;

namespace HookUI.UI
{
    public class HookUIUISystem : UISystemBase
    {
        private const string UI_GROUP = "hookui";

        private bool IsMenuOpen
        {
            get;
            set;
        } = false;

        private readonly ExtensionLoader _extensionLoader = new ExtensionLoader();

        protected override void OnCreate( )
        {
            base.OnCreate( );

            _extensionLoader.Load( );

            // Make available in UI which extensions we've found via C# reflection
            AddUpdateBinding( new GetterValueBinding<HashSet<string>>( UI_GROUP, "available_extensions", ( ) =>
            {
                return _extensionLoader.Extensions;
            }, new HashSetWriter<string>( ) ) );

            // Share the state of menu visibility to the Game UI
            AddUpdateBinding( new GetterValueBinding<bool>( UI_GROUP, "is_menu_open", ( ) =>
            {
                return IsMenuOpen;
            } ) );

            // Allow the UI to call `hookui.toggle_menu <bool>` to toggle menu
            AddBinding( new TriggerBinding<bool>( UI_GROUP, "toggle_menu", ( isOpen ) =>
            {
                IsMenuOpen = isOpen;
            } ) );
        }
    }
}
