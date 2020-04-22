using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using API.Domain.Models;
using API.Domain.Services;
using API.Domain.Repository;


namespace API.Services
{
    public class ProjectService : AbstractStandardService <Project>
    {
        public ProjectService(IStandardRepository<Project> projectRepository, IUnitOfWork unitOfWork) : base (projectRepository, unitOfWork)
        {

        }
    }
}
