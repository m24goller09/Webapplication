using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Persistence.Context;
using API.Domain.Repository;
using API.Domain.Models;

namespace API.Persistence.Repository
{
    public class UserRepository : IStandardRepository<User>
    {
        private readonly dbContext dbContext;

        public UserRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region List-Methods
        // List all user
        public async Task<IEnumerable<User>> ListAsync()
        {
            return await dbContext.User
                .ToListAsync();
        }

        // Find user by id
        public async Task<User> FindByIdAsync(dynamic id)
        {
            // Check if user is found will be made in the service class.
            return await dbContext.User.FindAsync(id);
        }
        #endregion List-Methods

        #region Add-Methods
        public async Task AddAsync(User user)
        {
            await dbContext.User.AddAsync(user);
        }
        #endregion Add-Methods

        #region Delete-Methods
        public void Remove(User user)
        {
            dbContext.User.Remove(user);
        }
        #endregion Delete-Methods
    }
}
