using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Persistence.Context;
using API.Domain.Repository;
using API.Domain.Models;

namespace API.Persistence.Repository
{
    public class SubtaskRepository : IStandardRepository<Subtask>
    {
        private readonly dbContext dbContext;
        public SubtaskRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region List-Methods
        // List all subtasks
        public async Task<IEnumerable<Subtask>> ListAsync()
        {
            return await dbContext.Subtask
                .ToListAsync();
        }

        // Find subtask by id
        public async Task<Subtask> FindByIdAsync(dynamic id)
        {
            // Check if subtask is found will be made in the service class.
            return await dbContext.Subtask.FindAsync(id);
        }
        #endregion List-Methods

        #region Add-Methods
        public async Task AddAsync(Subtask subtask)
        {
            await dbContext.Subtask.AddAsync(subtask);
        }
        #endregion Add-Methods


        #region Delete-Methods
        public void Remove(Subtask subtask)
        {
            dbContext.Subtask.Remove(subtask);
        }
        #endregion Delete-Methods
    }
}