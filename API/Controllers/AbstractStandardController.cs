using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public abstract class AbstractStandardController : ControllerBase
    {
        protected IActionResult HandleError(InternalErrorException e)
        {
            var pd = e.problemDetails;
            switch (pd.Status)
            {
                case 400:
                    return BadRequest(pd);
                case 404:
                    return NotFound(pd);
                default:
                    return Conflict(pd);
            }
        }
    }
}
