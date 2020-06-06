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
        public ProjectAssignmentRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region List-Methods
        // List all ProjectAssignments
        public async Task<IEnumerable<ProjectAssignment>> ListAsync()
        {
            return await dbContext.ProjectAssignment
                .Include(d => d.ProjectNavigation)
                .Include(d => d.UsernameNavigation)
                .Include(d => d.Project).ThenInclude(d => d.Subtask)
                .ToListAsync();
        }

        // Find ProjectAssignment by Id
        public async Task<ProjectAssignment> FindByIdAsync(dynamic id)
        {
            // Check if project assignment is found will be made in the service class.
            return await dbContext.ProjectAssignment.FindAsync(id);
        }

        // Find ProjectAssignments by project
        public async Task<IEnumerable<ProjectAssignment>> ListAsyncByProject(long projectid)
        {
            return await dbContext.ProjectAssignment
                .Where(s => s.ProjectId.Equals(projectid))
                .Include(d => d.UsernameNavigation)
                .ToListAsync();
        }

        // Find ProjectAssignments by user
        public async Task<IEnumerable<ProjectAssignment>> ListAsyncByUser(string userName)
        {
            return await dbContext.ProjectAssignment
                .Where(s => s.Username.Equals(userName))
                .Include(d => d.ProjectNavigation)
                .ToListAsync();
        }
        #endregion List-Methods

        #region Add-Methods
        public async Task AddAsync(ProjectAssignment projAssign)
        {
            await dbContext.ProjectAssignment.AddAsync(projAssign);
        }
        #endregion Add-Methods

        #region Delete-Methods
        public void Remove(ProjectAssignment projAssign)
        {
            dbContext.ProjectAssignment.Remove(projAssign);
        }
        #endregion Delete-Methods
    }
}
