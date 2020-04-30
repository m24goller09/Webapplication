using System.Reflection;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AuthServer.Infrastructure.Data.Identity
{
    public class PersistedGrantDbContextFactory : IDesignTimeDbContextFactory<PersistedGrantDbContext>
    {
        public PersistedGrantDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<PersistedGrantDbContext>();
            optionsBuilder.UseNpgsql("Host=ec2-46-137-177-160.eu-west-1.compute.amazonaws.com;Database=d89ookg72o27l9;Username=jbnbttdxtrdbpg;Password=79e49d32faa10b091a02d0f79cce9a6e4b07ee3350d12c87714834cac87c7092;sslmode=Prefer;Trust Server Certificate=true",
                sql => sql.MigrationsAssembly(typeof(PersistedGrantDbContextFactory).GetTypeInfo().Assembly.GetName().Name));
            return new PersistedGrantDbContext(optionsBuilder.Options, new OperationalStoreOptions());
        }
    }
}
