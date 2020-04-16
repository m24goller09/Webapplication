using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Exceptions
{
    public abstract class CustomException : Exception
    {
        public ProblemDetails problemDetails { get; protected set; }

        public abstract IActionResult GetActionResult();
    }
}
