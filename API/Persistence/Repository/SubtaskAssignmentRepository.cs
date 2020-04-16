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
    public class SubtaskAssignmentRepository : IStandardRepository<SubtaskAssignment>
    {
        private readonly dbContext dbContext;
        SubtaskAssignmentRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddAsync(SubtaskAssignment stAssign)
        {
            await dbContext.SubtaskAssignment.AddAsync(stAssign);
        }

        public async Task<SubtaskAssignment> FindByIdAsync(dynamic id)
        {
            // Check if subtask assignment is found will be made in the service class.
            return await dbContext.SubtaskAssignment.FindAsync(id);
        }

        public async Task<IEnumerable<SubtaskAssignment>> ListAsync()
        {
            return await dbContext.SubtaskAssignment
                .Include(d => d.UsernameNavigation) //JOIN
                .Include(d => d.Subtask) // JOIN
                .ToListAsync();
        }

        public void Update(SubtaskAssignment stAssign)
        {
            dbContext.SubtaskAssignment.Update(stAssign);
        }

        public void Remove(SubtaskAssignment stAssign)
        {
            dbContext.SubtaskAssignment.Remove(stAssign);
        }
    }
}
