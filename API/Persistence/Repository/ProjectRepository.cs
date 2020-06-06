using System.Collections.Generic;
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

        #region List-Methods
        // List all projects
        public async Task<IEnumerable<Project>> ListAsync()
        {
            return await dbContext.Project
                .Include(d => d.Subtask)
                .Include(d => d.ProjectAssignmentNavigation)
                .Include(d => d.ProjectAssignment)
                .ToListAsync();
        }


        // Find project by id
        public async Task<Project> FindByIdAsync(dynamic id)
        {
            // Check if project is found will be made in the service class.
            return await dbContext.Project.FindAsync(id);
        }
        #endregion List-Methods

        #region Add-Methods
        public async Task AddAsync(Project project)
        {
            await dbContext.Project.AddAsync(project);
        }
        #endregion Add-Methods

        #region Delete-Methods
        public void Remove(Project project)
        {
            dbContext.Project.Remove(project);
        }
        #endregion Delete-Methods
    }
}