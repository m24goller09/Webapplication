using AutoMapper;

using API.Domain.Models;
using API.DTOs;

namespace API.Mapping
{
    public class ModelToDTO : Profile
    {
        public ModelToDTO()
        {
            CreateMap<User, UserDTO>();
            CreateMap<Project, ProjectDTO>();
            CreateMap<ProjectAssignment, ProjectDTO>()
                .ForMember(det => det.ProjectID, opt => opt.MapFrom(src => src.ProjectNavigation.ProjectId))
                .ForMember(det => det.Name, opt => opt.MapFrom(src => src.ProjectNavigation.Name))
                .ForMember(det => det.Description, opt => opt.MapFrom(src => src.ProjectNavigation.Description))
                .ForMember(det => det.manager, opt => opt.MapFrom(src => src.ProjectNavigation.Manager));
        }
    }
}

