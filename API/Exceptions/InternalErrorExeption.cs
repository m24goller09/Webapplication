using Microsoft.AspNetCore.Mvc;

namespace API.Exceptions
{
    public class InternalErrorException :  CustomException
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

        public override IActionResult GetActionResult()
        {
            return new ObjectResult(problemDetails)
            {
                StatusCode = 500
            };
        }
    }
}

