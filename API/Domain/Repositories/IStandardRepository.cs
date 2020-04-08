using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.Repository
{
    public interface IStandardRepository <Model>
    {
        Task<IEnumerable<Model>> ListAsync();
        Task AddAsync(Model model);
        Task<Model> FindByIdAsync(int id);
        void Update(Model model);
        void Remove(Model model);
    }
}
