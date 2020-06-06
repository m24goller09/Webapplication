using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ProjectAssigmentDTO
    {
        [Required]
        public long ProjectID { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
