using System;
using System.Collections.Generic;

namespace API.Domain.Models
{
    public partial class SubtaskState
    {
        public SubtaskState()
        {
            Subtask = new HashSet<Subtask>();
        }

        public string State { get; set; }

        public virtual ICollection<Subtask> Subtask { get; set; }
    }
}
