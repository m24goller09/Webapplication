using Microsoft.AspNetCore.Mvc;

namespace API.Exceptions
{
    public class BadRequestException : CustomException
    {
        public BadRequestException(string detail, string instance)
        {
            problemDetails = new ProblemDetails
            {
                Status = 400,
                Type = "https://httpstatuses.com/400",
                Title = "bad request",
                Detail = detail,
                Instance = instance
            };
        }

        public override IActionResult GetActionResult()
        {
            return new BadRequestObjectResult(problemDetails);
        }
    }
}
