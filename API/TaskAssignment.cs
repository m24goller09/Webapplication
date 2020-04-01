using System;
using System.Collections.Generic;

namespace API
{
    public partial class TaskAssignment
    {
        public string Username { get; set; }
        public long TaskId { get; set; }

        public virtual Task Task { get; set; }
        public virtual User UsernameNavigation { get; set; }
    }
}
