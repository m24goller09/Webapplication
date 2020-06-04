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
    public class SubtaskService : AbstractStandardService<Subtask>
    {
        private readonly ProjectRepository projectRepository;
        public SubtaskService(IStandardRepository<Subtask> subtaskRepository, IStandardRepository<User> userRepository, IStandardRepository<Project> projectRepository,
            IUnitOfWork unitOfWork) : base(subtaskRepository, unitOfWork)
        {
            this.projectRepository = (ProjectRepository)projectRepository;
        }

        public override async Task Update(Subtask modelToUpdate)
        {
            var currentSubtask = await standardRepository.FindByIdAsync(modelToUpdate.SubtaskId);
            NullCheck(currentSubtask);
            try
            {
                currentSubtask.Name         = modelToUpdate.Name;
                currentSubtask.Description  = modelToUpdate.Description;
                currentSubtask.State        = modelToUpdate.State;
                currentSubtask.Creator      = modelToUpdate.Creator;
                currentSubtask.Assigned     = modelToUpdate.Assigned;

                // we don't need to call the update method, as ef-core still tracks this object
                await unitOfWork.CompleteAsync();
            }
            catch(DbUpdateException e)
            {
                throw new BadRequestException(e.InnerException?.Message, typeof(Subtask).ToString());
            }
        }

        public async Task RemoveSubtask(long subtaskId, string usrRole, string usrName)
        {
            var subtask = await standardRepository.FindByIdAsync(subtaskId);
            NullCheck(subtask);
            var project = await projectRepository.FindByIdAsync(subtask.ProjectId);
            if(project == null)
            {
                throw new NotFoundException("Asked object does not exist", typeof(Project).ToString());
            }

            if(!usrRole.Equals("admin"))
            {
                if(!usrName.Equals(subtask.Creator))
                {
                    if(!usrName.Equals(project.Manager))
                    {
                        throw new UnauthorizedException("no permission", typeof(Subtask).ToString());
                    }                    
                }
            }
            standardRepository.Remove(subtask);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<Subtask>> GetSubtaskByProjectAsync(long projectid)
        {
            var subtasks = (await standardRepository.ListAsync())
                .Where(s => s.ProjectId == projectid);
            if (subtasks.Count() == 0)
            {
                throw new NotFoundException("These are not the subtasks you are looking for", typeof(Subtask).ToString());
            }
            return subtasks;
        }
    }
}
