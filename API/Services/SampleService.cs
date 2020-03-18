using API.Domain.Models;
using API.Domain.Services;
using API.Domain.Repository;

namespace API.Services
{
    public class SampleService : ISampleService
    {
        private readonly ISampleRepo sampleRepo;
        public SampleService( ISampleRepo sampleRepo )
        {
            this.sampleRepo = sampleRepo;
        }

        public SampleModel DumpWrapper()
        {
            return sampleRepo.GetModel();
        }
    }
}