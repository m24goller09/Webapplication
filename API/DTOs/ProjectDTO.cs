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
        public string Manager { get; set; }
        [Required]
        public string State { get; set; }
    }
}
