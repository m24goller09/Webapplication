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
    [Route("Subtask")]
    [ApiController]
    public class SubTaskController : ControllerBase
    {
        private readonly SubTaskService subTaskService;
        private readonly IMapper mapper;

        public SubTaskController(IStandardService<Subtask> subTaskService, IMapper mapper)
        {
            this.subTaskService = (SubTaskService)subTaskService;
            this.mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SubTaskDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var models = await subTaskService.ListAsync();
            return Ok(mapper.Map<IEnumerable<Subtask>, IEnumerable<SubTaskDTO>>(models));
        }

        [HttpGet("{subtaskid}")]
        [ProducesResponseType(typeof(SubTaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(long subtaskid)
        {
            try
            {
                var model = await subTaskService.FindByIdAsync(subtaskid);
                var dto = mapper.Map<Subtask, SubTaskDTO>(model);
                return Ok(dto);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(SubTaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] SubTaskDTO subtaskToAdd)
        {
            try
            {
                var subtask = mapper.Map<SubTaskDTO, Subtask>(subtaskToAdd);
                subtask.SubtaskId = 0;
                var savedSubtask = await subTaskService.AddAsync(subtask);
                var dto = mapper.Map<Subtask, SubTaskDTO>(savedSubtask);
                return Ok(dto);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPost("{subtaskid}/AssignUser/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AssignUser(long subtaskid, string username)
        {
            try
            {
                await subTaskService.AssignUserAsync(subtaskid, username);
                return Ok();
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(SubTaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateProject([FromBody] SubTaskDTO subtaskToUpdate)
        {
            try
            {
                var modelToUpdate = mapper.Map<SubTaskDTO, Subtask>(subtaskToUpdate);
                await subTaskService.Update(modelToUpdate);
                return Ok();
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }
    }
}
