using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class Subtask
    {
        public Subtask()
        {
            SubtaskAssignment = new HashSet<SubtaskAssignment>();
        }

        public long SubtaskId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long ProjectId { get; set; }

        public virtual Project Project { get; set; }
        public virtual ICollection<SubtaskAssignment> SubtaskAssignment { get; set; }
    }
}
