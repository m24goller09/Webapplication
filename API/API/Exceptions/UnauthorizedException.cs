using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Exceptions
{
    public class UnauthorizedException : CustomException
    {
        public UnauthorizedException(string detail, string instance)
        {
            problemDetails = new ProblemDetails
            {
                Status = 401,
                Type = "https://httpstatuses.com/401",
                Title = "unauthorized",
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
