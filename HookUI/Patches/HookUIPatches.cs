using cohtml.Net;
using Colossal.UI;
using Game;
using Game.Common;
using Game.SceneFlow;
using Game.UI;
using HarmonyLib;
using HookUI.UI;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace HookUI.Patches
{
    public static class HookUIPatches
    {
        const string UI_URL = "coui://hookuiresources/";
        const string INDEX_PATH = UI_URL + "index.html";

        public static void EnsureFolder( )
        {
            var resourceHandler = ( GameUIResourceHandler ) GameManager.instance.userInterface.view.uiSystem.resourceHandler;

            if ( resourceHandler == null || resourceHandler.HostLocationsMap.ContainsKey( "hookuiresources" ) )
                return;

            Directory.CreateDirectory( Builder.MOD_PATH );
            resourceHandler.HostLocationsMap.Add( "hookuiresources", new List<string> { Builder.MOD_PATH } );
            UnityEngine.Debug.Log( "Added HookUI resource location" );
        }

        [HarmonyPatch( typeof( SystemOrder ) )]
        public static class SystemOrderPatch
        {
            [HarmonyPatch( "Initialize" )]
            [HarmonyPostfix]
            public static void Postfix( UpdateSystem updateSystem )
            {
                updateSystem.UpdateAt<HookUIUISystem>( SystemUpdatePhase.UIUpdate );
            }
        }

        [HarmonyPatch( typeof( GameManager ), "InitializeUI" )]
        public static class GameManager_InitializeUIPatch
        {
            public static void Postfix( GameManager __instance )
            {
                EnsureFolder( );
                __instance.userInterface.view.url = INDEX_PATH;
                AccessTools.Field( typeof( GameManager ), "m_UILocation" ).SetValue( __instance, INDEX_PATH );
            }
        }

        [HarmonyPatch( typeof( UISystemBootstrapper ), "Awake" )]
        public static class UISystemBootstrapper_AwakePatch
        {
            public static void Postfix( UISystemBootstrapper __instance )
            {
                EnsureFolder( );
                UIManager.defaultUISystem.defaultUIView.url = INDEX_PATH;
                AccessTools.Field( typeof( UISystemBootstrapper ), "m_Url" ).SetValue( __instance, INDEX_PATH );
            }
        }

        public static void InstallGameResourceHook( Harmony harmony )
        {
            var requestDataType = typeof( GameUIResourceHandler ).GetNestedTypes( BindingFlags.NonPublic | BindingFlags.Instance )
                                        .FirstOrDefault( t => t.Name == "GameResourceRequestData" )
                                        ?? throw new Exception( "HookUI: Failed to find GameResourceRequestData to hook!" );

            var constructorInfo = requestDataType.GetConstructor( BindingFlags.Public | BindingFlags.Instance, null,
                                        new Type[] { typeof( uint ), typeof( string ), typeof( IResourceResponse ) }, null )
                                        ?? throw new Exception( "HookUI: Failed to find the constructor to hook!" );

            harmony.Patch( constructorInfo, new HarmonyMethod( typeof( HookUIPatches ), nameof( GameResourceRequestDataPrefix ) ) );
        }

        // The Prefix method
        static void GameResourceRequestDataPrefix( ref uint id, ref string uri, ref IResourceResponse response )
        {
            if ( uri.ToLowerInvariant( ).StartsWith( "coui://hookuiresources/media/" ) )
            {
                // Change uri to start with "coui://GameUI/Media" instead
                uri = "coui://GameUI/Media/" + uri.Substring( "coui://hookuiresources/media/".Length );
            }
        }


        //GameResourceRequestData
    }

    //[HarmonyPatch( typeof( GameManager ) )]
    //[HarmonyPatch( "InitializeUI" )]
    //public static class GameManager_InitializeUIPatch
    //{
    //    public static IEnumerable<CodeInstruction> Transpiler( IEnumerable<CodeInstruction> instructions )
    //    {
    //        var codes = new List<CodeInstruction>( instructions );
    //        var originalString = "/~UI~/GameUI";
    //        var newString = "/~UI~/HookUI";

    //        for ( int i = 0; i < codes.Count; i++ )
    //        {
    //            if ( codes[i].opcode == OpCodes.Ldstr && ( string ) codes[i].operand == originalString )
    //            {
    //                UnityEngine.Debug.Log( $"Replacing string: {codes[i].operand} with {newString}" );
    //                codes[i].operand = newString;
    //                //break; // Assuming there's only one occurrence to replace
    //            }
    //            //if (codes[i].opcode == OpCodes.Ldstr && (string)codes[i].operand == "gameui") {
    //            //    codes[i].operand = "HookUI";
    //            //    //break; // Assuming there's only one occurrence to replace
    //            //}
    //        }

    //        return codes.AsEnumerable( );
    //    }
    //}
    //public class UISystemBootstrapper : MonoBehaviour, IUIViewComponent
    //

    //[HarmonyPatch( typeof( UISystemBootstrapper ) )]
    //[HarmonyPatch( "Awake" )]
    //public static class UISystemBootstrapper_AwakePatch
    //{
    //    public static IEnumerable<CodeInstruction> Transpiler( IEnumerable<CodeInstruction> instructions )
    //    {
    //        var codes = new List<CodeInstruction>( instructions );
    //        var originalString = "/~UI~/GameUI";
    //        var newString = "/~UI~/HookUI";

    //        for ( int i = 0; i < codes.Count; i++ )
    //        {
    //            if ( codes[i].opcode == OpCodes.Ldstr && ( string ) codes[i].operand == originalString )
    //            {
    //                UnityEngine.Debug.Log( $"Replacing string: {codes[i].operand} with {newString}" );
    //                codes[i].operand = newString;
    //                //break; // Assuming there's only one occurrence to replace
    //            }
    //            //if (codes[i].opcode == OpCodes.Ldstr && (string)codes[i].operand == "gameui") {
    //            //    codes[i].operand = "HookUIMod";
    //            //    //break; // Assuming there's only one occurrence to replace
    //            //}
    //        }

    //        return codes.AsEnumerable( );
    //    }
    //}
}