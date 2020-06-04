using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task AddAsync(Subtask subtask)
        {
            await dbContext.Subtask.AddAsync(subtask);
        }

        public async Task<Subtask> FindByIdAsync(dynamic id)
        {
            // Check if subtask is found will be made in the service class.
            return await dbContext.Subtask.FindAsync(id);
        }

        public async Task<IEnumerable<Subtask>> ListAsync()
        {
            return await dbContext.Subtask
                .Include(d => d.Project).ThenInclude(d => d.Subtask) // Multiple JOINS
                .ToListAsync();
        }

        public void Remove(Subtask subtask)
        {
            dbContext.Subtask.Remove(subtask);
        }
    }
}
