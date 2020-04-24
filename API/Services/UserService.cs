using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using API.Domain.Models;
using API.Domain.Services;
using API.Domain.Repository;


namespace API.Services
{
    public class UserService : AbstractStandardService <User>
    {
        public UserService(IStandardRepository<User> userRepository, IUnitOfWork unitOfWork) : base (userRepository, unitOfWork)
        {

        }

        public override Task Update(User modelToUpdate)
        {
            // is never called.. 
            throw new NotImplementedException();
        }
    }
}
