using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using OrderingSystem.Authorization.Roles;
using OrderingSystem.Authorization.Users;
using OrderingSystem.MultiTenancy;
using OrderingSystem.Entities;

namespace OrderingSystem.EntityFrameworkCore
{
    public class OrderingSystemDbContext : AbpZeroDbContext<Tenant, Role, User, OrderingSystemDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Food> Foods { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Division> Division { get; set; }
        public DbSet<Types> Types { get; set; }

        public OrderingSystemDbContext(DbContextOptions<OrderingSystemDbContext> options)
            : base(options)
        {
        }
    }
}
