using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class Task
    {
        public Task()
        {
            TaskAssignment = new HashSet<TaskAssignment>();
        }

        public long TaskId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long ProjectId { get; set; }

        public virtual Project Project { get; set; }
        public virtual ICollection<TaskAssignment> TaskAssignment { get; set; }
    }
}
