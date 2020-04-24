using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class User
    {
        public User()
        {
            ProjectAssignment = new HashSet<ProjectAssignment>();
            SubtaskAssignment = new HashSet<SubtaskAssignment>();
        }

        public string Username { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ProjectAssignment> ProjectAssignment { get; set; }
        public virtual ICollection<SubtaskAssignment> SubtaskAssignment { get; set; }
    }
}
