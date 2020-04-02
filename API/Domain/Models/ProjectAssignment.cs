using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class ProjectAssignment
    {
        public ProjectAssignment()
        {
            Project = new HashSet<Project>();
        }

        public string Username { get; set; }
        public long ProjectId { get; set; }

        public virtual Project ProjectNavigation { get; set; }
        public virtual User UsernameNavigation { get; set; }
        public virtual ICollection<Project> Project { get; set; }
    }
}
