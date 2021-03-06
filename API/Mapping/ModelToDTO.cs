﻿using AutoMapper;

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
            CreateMap<Subtask, SubtaskDTO>();
            CreateMap<ProjectAssignment, ProjectDTO>();
        }
    }
}

