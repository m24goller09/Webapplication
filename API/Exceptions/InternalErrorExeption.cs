using Microsoft.AspNetCore.Mvc;

namespace API.Exceptions
{
    public class InternalErrorException :  AbstractException
    {
        public InternalErrorException(string detail, string instance) 
        {
            problemDetails = new ProblemDetails
            {
                Status = 500,
                Type = "https://httpstatuses.com/500",
                Title = "internal server error",
                Detail = detail,
                Instance = instance
            };
        }
    }
}

