﻿using AutoMapper;
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

        #region Get-Methods
        [Authorize(Policy = "ApiReader")]
        [Authorize(Policy = "Consumer")]
        [HttpGet("{username}")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
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
        #endregion Get-Methods

        #region Post-Methods
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostUser([FromBody] UserDTO userToAdd)
        {
            try
            {
                var user = mapper.Map<UserDTO, User>(userToAdd);
                var savedUser = await userService.AddAsync(user);
                var dto = mapper.Map<User, UserDTO>(savedUser);
                return Ok(dto);
            }
            catch(CustomException e)
            {
                return e.GetActionResult();
            }
        }
        #endregion Post-Methods
    }
}
