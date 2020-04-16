using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Services;
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

        public virtual async Task<Model> FindByIdAsync(string id)
        {
            return nullCheck(await standardRepository.FindByIdAsync(id));
        }

        public virtual async Task<Model> FindByIdAsync(int id)
        {
            return nullCheck(await standardRepository.FindByIdAsync(id));
        }

        private Model nullCheck(Model model)
        {
            if (model == null)
            {
                throw new Exception("we need to specify how to handle this case!!");
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
