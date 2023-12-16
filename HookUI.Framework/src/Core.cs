using System.IO;

namespace HookUILib.Core
{
    public enum ExtensionType
    {
        Panel,
        Options, // Game options panel
        ToolSystem, // Small UI on tool systems
        ApplicationButton, // E.g. chirps?
        TabbedPanel, // The buttons near economy panel etc with tabbed windows
    }

    public class UIExtension
    {
        public readonly string extensionID;
        public readonly string extensionContent;
        public readonly ExtensionType extensionType;
        public virtual string LoadEmbeddedResource( string resourceName )
        {
            var assembly = this.GetType( ).Assembly;

            using ( Stream stream = assembly.GetManifestResourceStream( resourceName ) )
            using ( StreamReader reader = new StreamReader( stream ) )
            {
                return reader.ReadToEnd( );
            }
        }
    }
}
