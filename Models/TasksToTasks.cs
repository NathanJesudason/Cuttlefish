using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class TasksToTasks
    {
        [Key] public int Id { get; set; }
        [ForeignKey("independentTaskID")]
        [Column(Order = 1)]
        public virtual Tasks independentTasks { get; set; }
        public int independentTaskID { get; set; }

        [ForeignKey("dependentTaskID")]
        [Column(Order = 2)]
        public virtual Tasks dependentTasks { get; set; }
        public int dependentTaskID { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public TasksToTasks()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}