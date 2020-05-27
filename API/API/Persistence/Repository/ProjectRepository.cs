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
    public class ProjectRepository : IStandardRepository<Project>
    {
        private readonly dbContext dbContext;

        public ProjectRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddAsync(Project project)
        {
            await dbContext.Project.AddAsync(project);
        }

        public async Task<Project> FindByIdAsync(dynamic id)
        {
            // Check if project is found will be made in the service class.
            return await dbContext.Project.FindAsync(id);
        }

        public async Task<IEnumerable<Project>> ListAsync()
        {
            return await dbContext.Project
                .Include(d => d.Subtask) //JOIN
                .Include(d => d.ProjectAssignmentNavigation) //JOIN
                .Include(d => d.ProjectAssignment).ThenInclude(d => d.Project).ThenInclude(d => d.Subtask) // Multiple JOINS
                .ToListAsync();
        }

        public void Update(Project project)
        {
            dbContext.Project.Update(project);
        }

        public void Remove(Project project)
        {
            dbContext.Project.Remove(project);
        }
    }
}