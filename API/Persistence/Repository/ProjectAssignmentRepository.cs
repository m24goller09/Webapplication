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
    public class ProjectAssignmentRepository : IStandardRepository<ProjectAssignment>
    {
        private readonly dbContext dbContext;
        ProjectAssignmentRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddAsync(ProjectAssignment projAssign)
        {
            await dbContext.ProjectAssignment.AddAsync(projAssign);
        }

        public async Task<ProjectAssignment> FindByIdAsync(dynamic id)
        {
            // Check if project assignment is found will be made in the service class.
            return await dbContext.ProjectAssignment.FindAsync(id);
        }

        public async Task<IEnumerable<ProjectAssignment>> ListAsync()
        {
            return await dbContext.ProjectAssignment
                .Include(d => d.ProjectNavigation) //JOIN
                .Include(d => d.UsernameNavigation) //JOIN
                .Include(d => d.Project).ThenInclude(d => d.Subtask) // Multiple JOINS
                .ToListAsync();
        }

        public void Update(ProjectAssignment projAssign)
        {
            dbContext.ProjectAssignment.Update(projAssign);
        }

        public void Remove(ProjectAssignment projAssign)
        {
            dbContext.ProjectAssignment.Remove(projAssign);
        }
    }
}