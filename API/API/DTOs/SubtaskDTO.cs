using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public string Creator { get; set; }
        public string Assigned { get; set; }
    }
}
