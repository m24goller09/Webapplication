using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ProjectDTO
    {
        public long ProjectID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string manager { get; set; }
    }
}
