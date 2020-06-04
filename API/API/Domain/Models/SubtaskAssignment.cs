using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class SubtaskAssignment
    {
        public string Username { get; set; }
        public long SubtaskId { get; set; }

        public virtual Subtask Subtask { get; set; }
        public virtual User UsernameNavigation { get; set; }
    }
}
