using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
        public ProjectService(IStandardRepository<Project> projectRepository, IStandardRepository<ProjectAssignment> assignRepository, IUnitOfWork unitOfWork) : base(projectRepository, unitOfWork)
        {
            projectAssignmentRepository = (ProjectAssignmentRepository)assignRepository;
        }

        public override async Task<Project> AddAsync(Project project)
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

                    await projectAssignmentRepository.AddAsync(projectAssignment);
                    await unitOfWork.CompleteAsync();
                    transaction.Commit();
                }
            }
            catch (DbUpdateException e)
            {
                throw new BadRequestException(e.InnerException?.Message, typeof(Project).ToString());
            }
            return project;
        }

        public async Task<IEnumerable<ProjectAssignment>> GetProjectByUserAsync(string userName)
        {
            var projectAssignments = await projectAssignmentRepository.ListAsyncByUser(userName);
            if(projectAssignments.Count() == 0)
            {
                throw new NotFoundException("No projects for asked user", typeof(Project).ToString());
            }
            return projectAssignments;
        }

        public async Task<IEnumerable<ProjectAssignment>> GetUserByProjectAsync(long projectid)
        {
            var projectAssignments = await projectAssignmentRepository.ListAsyncByProject(projectid);
            if(projectAssignments.Count() == 0)
            {
                throw new NotFoundException("No users for this project", typeof(Project).ToString());
            }
            return projectAssignments;
        }

        public override async Task Update(Project modelToUpdate)
        {
            var currentProject = await standardRepository.FindByIdAsync(modelToUpdate.ProjectId);
            NullCheck(currentProject);
            try
            {
                // is the manager updateable?
                //tmpUser.Manager = modelToUpdate.Manager;
                currentProject.Name = modelToUpdate.Name;
                currentProject.Description = modelToUpdate.Description;
                currentProject.State = modelToUpdate.State;
                // we don't need to call the update method, as ef-core still tracks this object 
                await unitOfWork.CompleteAsync();
            }
            catch (DbUpdateException e)
            {
                throw new BadRequestException(e.InnerException?.Message, typeof(Project).ToString());
            }
        }

        public async Task RemoveProject(long projectId, string usrRole, string usrName)
        {
            var project = await standardRepository.FindByIdAsync(projectId);
            NullCheck(project);

            if(!usrRole.Equals("admin"))
            {
                if(!usrName.Equals(project.Manager))
                {
                    throw new UnauthorizedException("no permission", typeof(Project).ToString());
                }
            }
            standardRepository.Remove(project);
            await unitOfWork.CompleteAsync();
        }

        public async Task LeaveProject(long projectId, string usrToDelete, string usrRole, string usrName)
        {
            var projects = await projectAssignmentRepository.ListAsyncByProject(projectId);
            ProjectAssignment result = null;
            foreach(ProjectAssignment proj in projects)
            {
                if(proj.Username.Equals(usrToDelete))
                {
                    result = proj;
                    break;
                }
            }
            if(result == null)
            {
                throw new NotFoundException("asked assignment does not exist", typeof(ProjectAssignment).ToString());
            }
            var project = await standardRepository.FindByIdAsync(result.ProjectId);
            NullCheck(project);

            if(!usrRole.Equals("admin"))
            {
                if(!usrName.Equals(usrToDelete))
                {
                    if(!usrName.Equals(project.Manager))
                    {
                        throw new UnauthorizedException("no permission", typeof(Project).ToString());
                    }
                }
            }
            projectAssignmentRepository.Remove(result);
            await unitOfWork.CompleteAsync();
        }

        public async Task AddUser(long projectid, string userName)
        {
            // Check if project exists
            NullCheck(await standardRepository.FindByIdAsync(projectid));
            // Assign user
            try
            {
                var projectAssignment = new ProjectAssignment()
                {
                    ProjectId = projectid,
                    Username = userName
                };
                await projectAssignmentRepository.AddAsync(projectAssignment);
                await unitOfWork.CompleteAsync();
            }
            catch (DbUpdateException e)
            {
                throw new BadRequestException(e.InnerException?.Message, typeof(Project).ToString());
            }
        }
    }
}
