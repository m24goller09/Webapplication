using System;

namespace API.DTOs
{
    public class ProjectDTO
    {
        public long ProjectID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string manager { get; set; }
    }
}
