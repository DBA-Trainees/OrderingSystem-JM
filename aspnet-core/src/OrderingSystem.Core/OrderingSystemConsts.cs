using OrderingSystem.Debugging;

namespace OrderingSystem
{
    public class OrderingSystemConsts
    {
        public const string LocalizationSourceName = "OrderingSystem";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "f7dd5074ef084a4b8e72af0d67b1e69a";
    }
}
