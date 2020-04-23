using AutoMapper;

using API.Domain.Models;
using API.DTOs;


namespace API.Mapping
{
    public class DTOtoModel : Profile
    {
        public DTOtoModel()
        {
            CreateMap<UserDTO, User>();
        }
    }
}
