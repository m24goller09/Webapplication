using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Services;
using API.Domain.Models;
using API.Domain.Repository;

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

        public virtual async Task AddAsync(Model usertoAdd)
        {
            await standardRepository.AddAsync(usertoAdd);
            await unitOfWork.CompleteAsync();
        }

        public virtual async Task<Model> FindByIdAsync(int id)
        {
            var tmpModel = await standardRepository.FindByIdAsync(id);

            if (tmpModel == null)
            {
                throw new Exception("we need to specify how to handle this case!!");
            }
            return tmpModel;
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
