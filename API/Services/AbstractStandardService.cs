using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using API.Domain.Services;
using API.Domain.Repository;
using API.Exceptions;



namespace API.Services
{
    public abstract class AbstractStandardService <Model> : IStandardService<Model>
    {
        protected readonly IStandardRepository<Model> standardRepository;
        protected readonly IUnitOfWork unitOfWork;
        protected AbstractStandardService(IStandardRepository<Model> standardRepository, IUnitOfWork unitOfWork)
        {
            this.standardRepository = standardRepository;
            this.unitOfWork = unitOfWork;
        }

        public virtual async Task<Model> AddAsync(Model modelToAdd)
        {
            try
            {
                await standardRepository.AddAsync(modelToAdd);
                await unitOfWork.CompleteAsync();
            }
            catch(DbUpdateException e)
            {
                throw new BadRequestException(e.InnerException.Message, typeof(Model).ToString());
            }
            return modelToAdd;
        }

        public virtual async Task<Model> FindByIdAsync(string id)
        {
            return NullCheck(await standardRepository.FindByIdAsync(id));
        }

        public virtual async Task<Model> FindByIdAsync(int id)
        {
            return NullCheck(await standardRepository.FindByIdAsync(id));
        }

        private Model NullCheck(Model model)
        {
            if (model == null)
            {
                throw new NotFoundException("Asked object does not exist", typeof(Model).ToString());
            }
            return model;
        }

        public virtual async Task<IEnumerable<Model>> ListAsync()
        {
            return await standardRepository.ListAsync();
        }

        public virtual async Task Remove(Model modelToRemove)
        {
            standardRepository.Remove(modelToRemove);
            await unitOfWork.CompleteAsync();
        }

        public virtual Task Update(Model modelToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
