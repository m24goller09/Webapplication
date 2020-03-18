using AutoMapper;
using Microsoft.AspNetCore.Mvc;

using API.DTOs;
using API.Domain.Models;
using API.Domain.Services;

//  https://localhost:5001/Sample default url to test the get method
//  of this controller

namespace API.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class SampleController : ControllerBase
    {
        private readonly ISampleService sampleService;
        private readonly IMapper        mapper;

        public SampleController( ISampleService sampleService, IMapper mapper )
        {
            this.sampleService  = sampleService;
            this.mapper         = mapper;    
        }

        [HttpGet]
        public SampleModelDTO Get()
        {
            var model = sampleService.DumpWrapper();
            var dto = mapper.Map<SampleModel, SampleModelDTO>(model);  
            return dto;
        }
    }
}
