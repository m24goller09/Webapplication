using System.Collections.Generic;
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

        #region List-Methods
        // List all models
        public virtual async Task<IEnumerable<Model>> ListAsync()
        {
            return await standardRepository.ListAsync();
        }

        // Find model by string-id
        public virtual async Task<Model> FindByIdAsync(string id)
        {
            return NullCheck(await standardRepository.FindByIdAsync(id));
        }

        // Find model by long-id
        public virtual async Task<Model> FindByIdAsync(long id)
        {
            return NullCheck(await standardRepository.FindByIdAsync(id));
        }
        #endregion List-Methods

        #region Add-Methods
        public virtual async Task<Model> AddAsync(Model modelToAdd)
        {
            try
            {
                await standardRepository.AddAsync(modelToAdd);
                await unitOfWork.CompleteAsync();
            }
            catch (DbUpdateException e)
            {
                // Return a bad request if insert fails
                throw new BadRequestException(e.InnerException?.Message, typeof(Model).ToString());
            }
            return modelToAdd;
        }
        #endregion Add-Methods

        #region Update-Methods
        public abstract Task Update(Model modelToUpdate);
        #endregion Update-Methods

        #region Helper-Methods
        protected Model NullCheck(Model model)
        {
            if (model == null)
            {
                throw new NotFoundException("Asked object does not exist", typeof(Model).ToString());
            }
            return model;
        }
        #endregion Helper-Methods
    }
}