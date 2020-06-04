using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class Subtask
    {
        public long SubtaskId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long ProjectId { get; set; }
        public string State { get; set; }
        public string Creator { get; set; }
        public string Assigned { get; set; }

        public virtual Project Project { get; set; }
        public virtual ProjectAssignment ProjectAssignment { get; set; }
        public virtual ProjectAssignment ProjectAssignmentNavigation { get; set; }
        public virtual SubtaskState StateNavigation { get; set; }
    }
}
