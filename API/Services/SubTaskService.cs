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
    public class SubTaskService : AbstractStandardService<Subtask>
    {
        private readonly UserRepository userRepository;
        private readonly SubtaskAssignmentRepository subtaskAsgnmRepository;
        public SubTaskService(IStandardRepository<Subtask> subtaskRepository, IStandardRepository<User> userRepository, IStandardRepository<SubtaskAssignment> subtaskAsgnmRepository,
            IUnitOfWork unitOfWork) : base(subtaskRepository, unitOfWork)
        {
            this.userRepository = (UserRepository)userRepository;
            this.subtaskAsgnmRepository = (SubtaskAssignmentRepository)subtaskAsgnmRepository;
        }

        public override async Task Update(Subtask modelToUpdate)
        {
            var currentSubtask = await standardRepository.FindByIdAsync(modelToUpdate.SubtaskId);
            NullCheck(currentSubtask);
            try
            {
                currentSubtask.Name = modelToUpdate.Name;
                currentSubtask.Description = modelToUpdate.Description;
                // we don't need to call the update method, as ef-core still tracks this object 
                await unitOfWork.CompleteAsync();
            }
            catch(DbUpdateException e)
            {
                throw new BadRequestException(e.InnerException?.Message, typeof(Subtask).ToString());
            }
        }

        public async Task AssignUserAsync(long subtaskid, string username)
        {
            NullCheck(await standardRepository.FindByIdAsync(subtaskid));
            NullCheck(await userRepository.FindByIdAsync(username));

            var subtaskAssignment = new SubtaskAssignment()
            {
                SubtaskId = subtaskid,
                Username = username
            };
            try
            {
                await subtaskAsgnmRepository.AddAsync(subtaskAssignment);
                await unitOfWork.CompleteAsync();
            }
            catch(DbUpdateException e)
            {
                throw new InternalErrorException(e.InnerException?.Message, typeof(SubtaskAssignment).ToString());
            }

        }

        private void NullCheck(User user)
        {
            if (user == null)
            {
                throw new NotFoundException("Asked object does not exist", typeof(User).ToString());
            }
        }
    }
}
