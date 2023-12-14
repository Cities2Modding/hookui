using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System;
using System.Linq;
using UnityEngine;

namespace HookUI
{
    internal class Builder
    {
        public static readonly string UI_PATH = Path.Combine( Application.streamingAssetsPath, "~UI~", "GameUI" );
        public static readonly string MOD_PATH = Path.Combine( Application.persistentDataPath, "Mods", "HookUI" );

        public void Run( )
        {
            var srcFile = "Cities2_Data\\StreamingAssets\\~UI~\\HookUI\\index.html.template";
            var dstFile = "Cities2_Data\\StreamingAssets\\~UI~\\HookUI\\index.html";

            var actualVersion = Game.Version.current.shortVersion;
            // TODO move this into the horrible XML project/solution file
            var compatibleVersion = "1.0.18f1";

            Install( );
            // InitializeFileWatcher();

            if ( CheckVersion( actualVersion, compatibleVersion ) )
            {
                WriteFileToPath( srcFile, dstFile );
            }
            else
            {
                PrintVersionWarning( srcFile, dstFile, actualVersion, compatibleVersion );
            }
        }

        // TODO We don't actually use this file watcher yet, but would be nice to be able to turn off the
        // UI reload for Extensions, and then use the file watcher so we can hot-reload extensions
        // For now, the built-in reload will do
        // private void InitializeFileWatcher() {
        //     this.watcher = new System.IO.FileSystemWatcher(extensionsPath);
        //     this.watcher.Path = extensionsPath;
        //     //this.watcher.SynchronizingObject = ThreadingHelper.SynchronizingObject;

        //     // NotifyFilters.LastAccess | NotifyFilters.FileName
        //     this.watcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.FileName | NotifyFilters.DirectoryName;

        //     //this.watcher.Filter = "*.js";

        //     this.watcher.Created += OnFileCreated;
        //     this.watcher.Deleted += OnFileDeleted;

        //     this.watcher.EnableRaisingEvents = true;
        //     UnityEngine.Debug.Log($"Watcher set to track {this.watcher.Path}");
        // }
        // private void OnFileCreated(object source, FileSystemEventArgs e) {
        //     UnityEngine.Debug.Log($"File created {e.Name}");
        //     Logger.LogInfo($"File created {e.Name}");
        //     //this.AddExtension(e.Name);
        // }
        // private void OnFileDeleted(object source, FileSystemEventArgs e) {
        //     UnityEngine.Debug.Log($"File deleted {e.Name}");
        //     Logger.LogInfo($"File deleted {e.Name}");
        //     //availableExtensions.Remove(e.Name);
        // }

        public static String InjectHookUILoader( String orig_text )
        {
            var src = "tutorialListFocusKey:QSe.tutorialList})]";
            var dst = "tutorialListFocusKey:QSe.tutorialList}),(0,e.jsx)(window._$hookui_loader,{react:i})]";
            return orig_text.Replace( src, dst );
        }

        public static String HookPanelsMenu( String orig_text )
        {
            var src = "fge.lock})})})})]";
            var dst = "fge.lock})})})}),(0,e.jsx)(window._$hookui_menu,{react:i})]";
            return orig_text.Replace( src, dst );
        }

        public static String OverwriteAbsoluteButton( String orig_text )
        {
            var src = ".button_H9N{pointer-events:auto;position:absolute;top:0;left:0}";
            var dst = ".button_H9N{pointer-events:auto}";
            return orig_text.Replace( src, dst );
        }

        public static void WriteResourcesToDisk( )
        {
            var resources = new []
            {
                "hookui.js",
                "index.html"
            };

            Directory.CreateDirectory( MOD_PATH );

            var assembly = typeof( Builder ).Assembly;

            foreach ( var resourceName in resources )
            {
                var resourcePath = "HookUI.Resources." + resourceName;
                using ( var resourceStream = assembly.GetManifestResourceStream( resourcePath ) )
                {
                    if ( resourceStream == null )
                        throw new InvalidOperationException( "Could not find embedded resource: " + resourceName );

                    var targetPath = Path.Combine( MOD_PATH, resourceName );
                    using ( var fileStream = new FileStream( targetPath, FileMode.Create ) )
                    {
                        resourceStream.CopyTo( fileStream );
                    }
                }
            }
        }

        private void TransformFile( string fileName, Func<string, string> onTransform )
        {            
            var sourcePath = Path.Combine( UI_PATH, fileName );
            var targetPath = Path.Combine( MOD_PATH, fileName );
            var contents = onTransform( File.ReadAllText( sourcePath ) );
            File.WriteAllText( targetPath, contents );
        }

        private void WriteVersionFile( )
        {
            File.WriteAllText( Path.Combine( MOD_PATH, "version" ), MyPluginInfo.PLUGIN_VERSION );
        }

        private void TransformFiles( )
        {
            // Patches injection points in the bundle
            TransformFile( "index.js", ( contents ) =>
            {
                contents = InjectHookUILoader( contents );
                contents = HookPanelsMenu( contents );
                return contents;
            } );

            // Patches some built-in styling
            TransformFile( "index.css", ( contents ) =>
            {
                contents = OverwriteAbsoluteButton( contents );
                return contents;
            } );
        }

        public void Install( )
        {
            var assetsDir = "Cities2_Data\\StreamingAssets\\~UI~";
            // TODO obviously, we don't want to do this every time, try to read version then adjust
            //CopyDirectory( assetsDir + "\\GameUI", assetsDir + "\\HookUI" );

            WriteVersionFile( );
            TransformFiles( );

            WriteResourcesToDisk( );

            Directory.CreateDirectory( Path.Combine( MOD_PATH, "Extensions" ) );
        }

        public static bool CheckVersion( string currentVersion, string compatibleVersion )
        {
            UnityEngine.Debug.Log( "HookUI VersionCheck" );
            UnityEngine.Debug.Log( currentVersion );
            if ( currentVersion == compatibleVersion )
            {
                UnityEngine.Debug.Log( "Passed version check" );
                var actualJSHash = "";
                var actualHTMLHash = "";

                var expectedJSHash = "CAA2852C609B391E942A474EA4A26A4AD14E66DE6A1C5FEE4E1B8C111D3E9492";
                var expectedHTMLHash = "CAA2852C609B391E942A474EA4A26A4AD14E66DE6A1C5FEE4E1B8C111D3E9492";

                if ( true || actualJSHash == expectedJSHash )
                {
                    if ( true || actualHTMLHash == expectedHTMLHash )
                    {
                        UnityEngine.Debug.Log( "Passed hash checks" );

                        // Everything went OK, we can proceed
                        return true;
                    }
                    else
                    {
                        UnityEngine.Debug.Log( $"Failed hash check for HTML file. Expected {expectedHTMLHash} but got {actualHTMLHash}" );
                        return false;
                    }
                }
                else
                {
                    UnityEngine.Debug.Log( $"Failed hash check for JavaScript file. Expected {expectedJSHash} but got {actualJSHash}" );
                    return false;
                }
            }
            else
            {
                UnityEngine.Debug.Log( "This HookUI version might not be compatible with your game version" );
                return false;
            }
        }

        //public static void CopyDirectory( string sourceDir, string destinationDir )
        //{
        //    DirectoryInfo dir = new DirectoryInfo( destinationDir );
        //    if ( !dir.Exists )
        //    {
        //        dir.Create( );
        //    }

        //    DirectoryInfo sourceDirectoryInfo = new DirectoryInfo( sourceDir );

        //    foreach ( FileInfo file in sourceDirectoryInfo.GetFiles( ) )
        //    {
        //        string targetFilePath = Path.Combine( destinationDir, file.Name );
        //        file.CopyTo( targetFilePath, true );
        //    }

        //    foreach ( DirectoryInfo subdir in sourceDirectoryInfo.GetDirectories( ) )
        //    {
        //        string newDestinationDir = Path.Combine( destinationDir, subdir.Name );
        //        CopyDirectory( subdir.FullName, newDestinationDir );
        //    }
        //}

        public static void WriteFileToPath( string filePath, string destinationPath )
        {
            string fileContent = File.ReadAllText( filePath );
            File.WriteAllText( destinationPath, fileContent );
        }

        public static void PrintVersionWarning( string filePath, string destinationPath, string actualVersion, string expectedVersion )
        {
            var fileContent = File.ReadAllText( filePath );
            fileContent = fileContent.Replace( "{{Extensions}}", $"<div style=\"position: absolute; top: 10px; left: 10px; z-index: 10000; color: white;\" onclick=\"if (this.parentNode) this.parentNode.removeChild(this);\"><div>This HookUI version is not compatible with your game version.</div><div>Loading of extensions disabled.</div><div>{actualVersion} = Your CS2 version</div><div>{expectedVersion} = Last tested CS2 version with HookUI</div><div>Click to hide</div></div>" );
            File.WriteAllText( destinationPath, fileContent );
        }

        public List<string> GenerateScriptPathsList( string directoryPath )
        {
            var fullPathScriptFiles = Directory.GetFiles( directoryPath, "*.js" );

            var scriptPaths = fullPathScriptFiles.Select( fullPath => Path.Combine( "Extensions", Path.GetFileName( fullPath ) ) ).ToList( );

            return scriptPaths;
        }
    }
}
