using System;
using System.Collections.Generic;

namespace API
{
    public partial class Project
    {
        public Project()
        {
            ProjectAssignmentNavigation = new HashSet<ProjectAssignment>();
            Task = new HashSet<Task>();
        }

        public long ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Manager { get; set; }

        public virtual ProjectAssignment ProjectAssignment { get; set; }
        public virtual ICollection<ProjectAssignment> ProjectAssignmentNavigation { get; set; }
        public virtual ICollection<Task> Task { get; set; }
    }
}
