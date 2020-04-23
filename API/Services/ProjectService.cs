using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using API.Exceptions;
using API.Domain.Models;
using API.Domain.Services;
using API.Domain.Repository;
using API.Persistence.Repository;


namespace API.Services
{
    public class ProjectService : AbstractStandardService <Project>
    {
        private readonly ProjectAssignmentRepository projectAssignmentRepository;
        public ProjectService(IStandardRepository<Project> projectRepository, IStandardRepository<ProjectAssignment> assignRepository, IUnitOfWork unitOfWork) : base (projectRepository, unitOfWork)
        {
            projectAssignmentRepository = (ProjectAssignmentRepository)assignRepository;
        }

        public async Task <IEnumerable<ProjectAssignment>> GetProjectByUserAsync(string userName)
        {
            var projects = await projectAssignmentRepository.ListAsyncByUser(userName);
            if(projects.Count() == 0)
            {
                throw new NotFoundException("No projects for asked user", typeof(Project).ToString());
            }
            return projects;
        }
    }
}
