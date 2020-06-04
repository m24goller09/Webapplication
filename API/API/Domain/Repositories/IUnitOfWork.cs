using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;

namespace API.Domain.Repository
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
        IDbContextTransaction BeginTransaction();
    }

}
