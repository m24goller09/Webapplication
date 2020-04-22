using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

using API.DTOs;
using API.Domain.Models;
using API.Domain.Services;
using API.Services;
using API.Exceptions;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
    [Route("Project")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService projectService;
        private readonly IMapper mapper;

        public ProjectController(IStandardService<Project> projectService, IMapper mapper)
        {
            this.projectService =  (ProjectService) projectService;
            this.mapper = mapper;
        }

        [HttpGet("{projectid}")]
        [ProducesResponseType(typeof(ProjectDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(long projectid)
        {
            try
            {
                var model = await projectService.FindByIdAsync(projectid);
                var dto = mapper.Map<Project, ProjectDTO>(model);
                return Ok(dto);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }
    }
}
