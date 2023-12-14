using BepInEx;
using HarmonyLib;
using HookUI.Patches;
using System.Linq;
using System.Reflection;

#if BEPINEX_V6
    using BepInEx.Unity.Mono;
#endif

namespace HookUI
{
    [BepInPlugin( MyPluginInfo.PLUGIN_GUID, MyPluginInfo.PLUGIN_NAME, MyPluginInfo.PLUGIN_VERSION )]
    public class Plugin : BaseUnityPlugin
    {
        private void Awake( )
        {
            Logger.LogInfo( $"Plugin {MyPluginInfo.PLUGIN_GUID} is loaded!" );

            var harmony = Harmony.CreateAndPatchAll( Assembly.GetExecutingAssembly( ), MyPluginInfo.PLUGIN_GUID + "_Cities2Harmony" );

            HookUIPatches.InstallGameResourceHook( harmony );

            var patchedMethods = harmony.GetPatchedMethods( ).ToArray( );

            Logger.LogInfo( $"Plugin {MyPluginInfo.PLUGIN_GUID} made patches! Patched methods: " + patchedMethods.Length );

            foreach ( var patchedMethod in patchedMethods )
            {
                Logger.LogInfo( $"Patched method: {patchedMethod.Module.Name}:{patchedMethod.Name}" );
            }

            var builder = new Builder( );
            builder.Run( );
        }
    }
}
