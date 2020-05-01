using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class ProjectAssignment
    {
        public ProjectAssignment()
        {
            Project = new HashSet<Project>();
            SubtaskProjectAssignment = new HashSet<Subtask>();
            SubtaskProjectAssignmentNavigation = new HashSet<Subtask>();
        }

        public string Username { get; set; }
        public long ProjectId { get; set; }

        public virtual Project ProjectNavigation { get; set; }
        public virtual User UsernameNavigation { get; set; }
        public virtual ICollection<Project> Project { get; set; }
        public virtual ICollection<Subtask> SubtaskProjectAssignment { get; set; }
        public virtual ICollection<Subtask> SubtaskProjectAssignmentNavigation { get; set; }
    }
}
