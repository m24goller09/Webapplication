using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Domain.Repository
{
    public interface IStandardRepository <Model>
    {
        Task<IEnumerable<Model>> ListAsync();
        Task AddAsync(Model model);
        // only accepts int and string
        Task <Model> FindByIdAsync(dynamic id);
        void Remove(Model model);
    }
}
