using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Persistence.Context;
using API.Domain.Repository;

namespace API.Persistence.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly dbContext dbContext;
       
        public UnitOfWork(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CompleteAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
