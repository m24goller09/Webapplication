//  Database access..
//  Async options should be used..
using API.Domain.Models;
using API.Domain.Repository;

namespace API.Persistence.Repository
{
    public class SampleRepository : ISampleRepo
    {
        public SampleModel GetModel()
        {
            SampleModel toReturn = new SampleModel();
            toReturn.testString = "just for testing purpose";
            toReturn.privateID  = 999;
            return toReturn;
        }
    }
}