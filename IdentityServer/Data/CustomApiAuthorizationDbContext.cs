using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Extensions;
using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Options;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using PersistedGrant = IdentityServer4.EntityFramework.Entities.PersistedGrant;

namespace IdentityServer.Data
{
    public class CustomApiAuthorizationDbContext<TUser, TRole, TKey> : IdentityDbContext<TUser, TRole, TKey>, IPersistedGrantDbContext
    where TUser : IdentityUser<TKey>
    where TRole : IdentityRole<TKey>
    where TKey : IEquatable<TKey>
    {
        private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;

        public CustomApiAuthorizationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options)
        {
            _operationalStoreOptions = operationalStoreOptions;
        }

        public DbSet<PersistedGrant> PersistedGrants { get; set; }

        public DbSet<DeviceFlowCodes> DeviceFlowCodes { get; set; }

        Task<int> IPersistedGrantDbContext.SaveChangesAsync() => base.SaveChangesAsync();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value);
        }
    }
}