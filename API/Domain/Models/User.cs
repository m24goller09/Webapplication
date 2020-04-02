using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class User
    {
        public User()
        {
            ProjectAssignment = new HashSet<ProjectAssignment>();
            TaskAssignment = new HashSet<TaskAssignment>();
        }

        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public byte[] IsAdmin { get; set; }

        public virtual ICollection<ProjectAssignment> ProjectAssignment { get; set; }
        public virtual ICollection<TaskAssignment> TaskAssignment { get; set; }
    }
}
