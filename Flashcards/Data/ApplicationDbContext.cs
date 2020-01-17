using Flashcards.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Flashcards.Data
{
    public class ApplicationDbContext : CustomApiAuthorizationDbContext<ApplicationUser, ApplicationRole, int>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Progression> Progressions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().ToTable("AppUser");

            builder.Entity<Progression>()
                .HasOne(p => p.ApplicationUser)
                .WithMany(x => x.Progressions)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Progression>()
                .Property(p => p.AppUserId)
                .IsRequired();

            builder.Entity<Progression>()
                .Property(p => p.DeckId)
                .IsRequired();

            builder.Entity<Progression>()
                .Property(p => p.Word)
                .HasMaxLength(20)
                .IsRequired();

            builder.Entity<Progression>()
                .Property(p => p.Understand)
                .IsRequired();

            builder.Entity<Progression>()
                .HasIndex(p => new { p.AppUserId, p.DeckId, p.Word, p.Understand })
                .IsUnique();
        }

    }
}
