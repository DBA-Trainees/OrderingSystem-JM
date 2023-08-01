using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace OrderingSystem.Authorization
{
    public class OrderingSystemAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));

            context.CreatePermission(PermissionNames.Pages_Customer, L("Customer"));
            context.CreatePermission(PermissionNames.Pages_Vendor, L("Vendor"));
            context.CreatePermission(PermissionNames.Pages_Food, L("Food"));
            context.CreatePermission(PermissionNames.Pages_Category, L("Category"));
            context.CreatePermission(PermissionNames.Pages_Division, L("Division"));
            context.CreatePermission(PermissionNames.Pages_Type , L("Type"));
            context.CreatePermission(PermissionNames.Pages_Dashboard, L("Dashboard"));

            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderingSystemConsts.LocalizationSourceName);
        }
    }
}
