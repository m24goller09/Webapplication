using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Services;
using API.Domain.Models;
using API.Domain.Repository;


namespace API.Services
{
    public class UserService : AbstractStandardService <User>
    {
        UserService(IStandardRepository<User> userRepository, IUnitOfWork unitOfWork) : base (userRepository, unitOfWork)
        {

        }
    }
}
