﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.Services
{
    public interface IStandardService <Model>
    {
        Task<IEnumerable<Model>> ListAsync();
        Task AddAsync(Model model);
        Task Update(Model modelsToUpdate);
        Task Remove(Model model);
    }
}

