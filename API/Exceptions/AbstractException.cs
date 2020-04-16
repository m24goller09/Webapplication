using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Exceptions
{
    public abstract class AbstractException : Exception
    {
        public ProblemDetails problemDetails { get; protected set; }

        public IActionResult GetActionResult()
        {
            var pd = problemDetails;
            switch (pd.Status)
            {
                case 400:
                    return new BadRequestObjectResult(pd);
                case 404:
                    return new NotFoundObjectResult(pd);
                default:
                    return new StatusCodeResult(403);
            }
        }

    }
}
