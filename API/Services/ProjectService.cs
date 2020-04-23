using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using API.Domain.Models;
using API.Domain.Services;
using API.Domain.Repository;
using API.Exceptions;

namespace API.Services
{
    public class ProjectService : AbstractStandardService <Project>
    {
        protected readonly IStandardRepository<ProjectAssignment> paRepository;

        public ProjectService(IStandardRepository<Project> projectRepository, IUnitOfWork unitOfWork, IStandardRepository<ProjectAssignment> paRepository)
            : base (projectRepository, unitOfWork)
        {
            this.paRepository = paRepository;
        }

        public virtual async Task<Project> AddAsync(Project project)
        {
            try
            {

                // EF fails on this transaction because it detects a cyclic dependency
                // the cyclic dependency is actually resolvable because the foreign key is deferrable, which EF does not account for
                // Order the transaction explicitely instead
                using (var transaction = unitOfWork.BeginTransaction())
                {
                    await standardRepository.AddAsync(project);
                    await unitOfWork.CompleteAsync();

                    // must be created after insert to use the updated ProjectId
                    var projectAssignment = new ProjectAssignment()
                    {
                        ProjectId = project.ProjectId,
                        Username = project.Manager
                    };

                    await paRepository.AddAsync(projectAssignment);
                    await unitOfWork.CompleteAsync();
                    transaction.Commit();
                }
            }
            catch(DbUpdateException e)
            {
                throw new BadRequestException(e.InnerException.Message, typeof(Project).ToString());
            }
            return project;
        }
    }
}
