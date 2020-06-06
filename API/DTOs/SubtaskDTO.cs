using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class SubtaskDTO
    {
        public long SubtaskId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public long ProjectId { get; set; }
        [Required]
        public string State { get; set; }
        // Not Required, is allowed to be NULL
        public string Creator { get; set; }
        // Not Required, is allowed to be NULL
        public string Assigned { get; set; }
    }
}
