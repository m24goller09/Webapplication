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
    [Route("Subtask")]
    [ApiController]
    public class SubtaskController : ControllerBase
    {
        private readonly SubtaskService subtaskService;
        private readonly IMapper mapper;

        public SubtaskController(IStandardService<Subtask> subtaskService, IMapper mapper)
        {
            this.subtaskService = (SubtaskService)subtaskService;
            this.mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SubtaskDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var models = await subtaskService.ListAsync();
            return Ok(mapper.Map<IEnumerable<Subtask>, IEnumerable<SubtaskDTO>>(models));
        }

        [HttpGet("{subtaskid}")]
        [ProducesResponseType(typeof(SubtaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(long subtaskid)
        {
            try
            {
                var model = await subtaskService.FindByIdAsync(subtaskid);
                var dto = mapper.Map<Subtask, SubtaskDTO>(model);
                return Ok(dto);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(SubtaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] SubtaskDTO subtaskToAdd)
        {
            try
            {
                var subtask = mapper.Map<SubtaskDTO, Subtask>(subtaskToAdd);
                subtask.SubtaskId = 0;
                var savedSubtask = await subtaskService.AddAsync(subtask);
                var dto = mapper.Map<Subtask, SubtaskDTO>(savedSubtask);
                return Ok(dto);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(SubtaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateProject([FromBody] SubtaskDTO subtaskToUpdate)
        {
            try
            {
                var modelToUpdate = mapper.Map<SubtaskDTO, Subtask>(subtaskToUpdate);
                await subtaskService.Update(modelToUpdate);
                return Ok();
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }

        [HttpGet("ByProject/{projectid}")]
        [ProducesResponseType(typeof(IEnumerable<SubtaskDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetSubtasksByProject(long projectid)
        {
            try
            {
                var dtos = (await subtaskService.GetSubtaskByProjectAsync(projectid))
                                .Select(mapper.Map<Subtask, SubtaskDTO>);
                return Ok(dtos);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }
    }
}
