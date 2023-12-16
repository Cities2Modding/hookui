using System.IO;
using System.Reflection;
using System;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;

namespace HookUI.UI.Extensions
{
    internal class ExtensionLoader
    {
        public HashSet<string> Extensions
        {
            get;
            private set;
        } = new HashSet<string>( 50 );

        public void Load( )
        {
            Extensions.Clear( );

            Debug.Log( "Finding hookui extensions" );

            // Finding all extensions
            var baseType = typeof( HookUILib.Core.UIExtension );

            var derivedTypes = AppDomain.CurrentDomain.GetAssemblies( )
                .SelectMany( assembly => assembly.GetTypes( ) )
                .Where( type => type.IsSubclassOf( baseType ) );

            foreach ( var type in derivedTypes )
            {
                var instance = Activator.CreateInstance( type );

                var uiName = type.FullName;
                var extensionID = type.GetField( "extensionID", BindingFlags.Public | BindingFlags.Instance ).GetValue( instance );
                var extensionContent = ( string ) type.GetField( "extensionContent", BindingFlags.Public | BindingFlags.Instance ).GetValue( instance );
                var extensionFilename = $"panel.{extensionID}.js";

                Debug.Log( $"{uiName} extensionPath: {extensionID}, extensionContent length: {extensionContent.Length}" );

                var installPath = Path.Combine( Builder.MOD_PATH, "Extensions", extensionFilename );

                Debug.Log( $"{uiName} installPath: {installPath}" );

                File.WriteAllText( installPath, extensionContent );
                AddExtension( extensionFilename );
            }
        }

        public void AddExtension( string id )
        {
            Extensions.Add( id );
        }
    }
}
