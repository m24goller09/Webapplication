using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using API.DTOs;
using API.Domain.Models;
using API.Domain.Services;

//  https://localhost:5002/Sample default url to test the get method
//  of this controller

namespace API.Controllers
{   /*
    [ApiController]
    [Route("/[controller]")]
    [Authorize]*/
    [Authorize(Policy = "ApiReader")]
    [Route("api/Values")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private readonly ISampleService sampleService;
        private readonly IMapper        mapper;

        public SampleController( ISampleService sampleService, IMapper mapper )
        {
            this.sampleService  = sampleService;
            this.mapper         = mapper;    
        }

        [Authorize(Policy = "Consumer")]
        [HttpGet]
        public SampleModelDTO Get()
        {
            System.Console.WriteLine("here motherfucker");
            var model = sampleService.DumpWrapper();
            var dto = mapper.Map<SampleModel, SampleModelDTO>(model);  
            return dto;
        }
    }
}
