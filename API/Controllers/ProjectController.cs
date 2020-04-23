using System.Collections.Generic;
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

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProjectDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var models = await projectService.ListAsync();
            return Ok(mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDTO>>(models));
        }

        [HttpGet("ByUser/{userName}")]
        [ProducesResponseType(typeof(IEnumerable<ProjectDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProjectByUser(string userName)
        {
            try
            {
                var models = await projectService.GetProjectByUserAsync(userName);
                var dto = mapper.Map<IEnumerable<ProjectAssignment>, IEnumerable<ProjectDTO>>(models);
                return Ok(dto);
            }
            catch(CustomException e)
            {
                return e.GetActionResult();
            }
        }

    }
}
