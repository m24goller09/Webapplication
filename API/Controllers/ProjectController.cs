using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
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
    //[Authorize(Policy = "ApiReader")]
    //[Authorize(Policy = "Consumer")]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService projectService;
        private readonly IMapper mapper;

        public ProjectController(IStandardService<Project> projectService, IMapper mapper)
        {
            this.projectService =  (ProjectService) projectService;
            this.mapper = mapper;
        }
        
        [HttpGet]  
        [ProducesResponseType(typeof(IEnumerable<ProjectDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var models = await projectService.ListAsync();
            return Ok(mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDTO>>(models));
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

        [HttpGet("ByUser/{userName}")]
        [ProducesResponseType(typeof(IEnumerable<ProjectDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProjectByUser(string userName)
        {
            try
            {
                var dtos = from model in (await projectService.GetProjectByUserAsync(userName))
                           select mapper.Map<Project, ProjectDTO>(model.ProjectNavigation);
                return Ok(dtos);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ProjectDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] ProjectDTO projectToAdd)
        {
            try
            {
                var project = mapper.Map<ProjectDTO, Project>(projectToAdd);
                project.ProjectId = 0;
                var savedProject = await projectService.AddAsync(project);
                var dto = mapper.Map<Project, ProjectDTO>(savedProject);
                return Ok(dto);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ProjectDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateProject([FromBody] ProjectDTO projectToUpdate)
        {
            try
            {
                var modelToUpdate = mapper.Map<ProjectDTO, Project>(projectToUpdate);
                await projectService.Update(modelToUpdate);
                return Ok();
            }
            catch(CustomException e)
            {
                return e.GetActionResult();
            }
        }

    }
}
