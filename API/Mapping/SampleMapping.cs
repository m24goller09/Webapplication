using AutoMapper;

using API.Domain.Models;
using API.DTOs;

namespace API.Mapping
{
    public class SampleMapping : Profile
    {
        public SampleMapping()
        {
            CreateMap<SampleModel, SampleModelDTO>()
                .ForMember(det => det.testString, opt => opt.MapFrom(src => src.testString));
            //  ForMember is unnecessary in this case. In the case of matching names
            //  no explicit mapping is required.
        }
    }
}