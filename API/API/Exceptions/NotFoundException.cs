using Microsoft.AspNetCore.Mvc;

namespace API.Exceptions
{
    public class NotFoundException : CustomException
    {
        public NotFoundException(string detail, string instance)
        {
            problemDetails = new ProblemDetails
            {
                Status = 404,
                Type = "https://httpstatuses.com/404",
                Title = "not found",
                Detail = detail,
                Instance = instance
            };
        }

        public override IActionResult GetActionResult()
        {
            return new NotFoundObjectResult(problemDetails);
        }
    }
}
