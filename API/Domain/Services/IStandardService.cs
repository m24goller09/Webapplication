using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Domain.Services
{
    public interface IStandardService <Model>
    {
        Task<IEnumerable<Model>> ListAsync();
        Task<Model> AddAsync(Model model);
        Task Update(Model modelsToUpdate);
    }
}

