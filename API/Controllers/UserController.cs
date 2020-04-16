using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

using API.DTOs;
using API.Domain.Models;
using API.Domain.Services;
using API.Services;
using API.Exceptions;

namespace API.Controllers
{
    [Route("User")]
    [ApiController]
    public class UserController : ControllerBase
    { 
        private readonly UserService userService;
        private readonly IMapper mapper;

        public UserController(IStandardService<User> userService, IMapper mapper)
        {
            this.userService =  (UserService) userService;
            this.mapper = mapper;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> Get(string username)
        {
            try
            {
                var model = await userService.FindByIdAsync(username);
                var dto = mapper.Map<User, UserDTO>(model);  
                return Ok(dto);
            }
            catch (CustomException e)
            {
                return e.GetActionResult();
            }
        }
    }
}
