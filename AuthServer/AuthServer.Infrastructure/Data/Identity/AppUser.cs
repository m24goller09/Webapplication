using Microsoft.AspNetCore.Identity;

namespace AuthServer.Infrastructure.Data.Identity
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }        
    }
}
