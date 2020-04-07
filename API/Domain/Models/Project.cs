using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class Project
    {
        public Project()
        {
            ProjectAssignmentNavigation = new HashSet<ProjectAssignment>();
            Subtask = new HashSet<Subtask>();
        }

        public long ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Manager { get; set; }

        public virtual ProjectAssignment ProjectAssignment { get; set; }
        public virtual ICollection<ProjectAssignment> ProjectAssignmentNavigation { get; set; }
        public virtual ICollection<Subtask> Subtask { get; set; }
    }
}
