using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class ProjectState
    {
        public ProjectState()
        {
            Project = new HashSet<Project>();
        }

        public string State { get; set; }

        public virtual ICollection<Project> Project { get; set; }
    }
}
