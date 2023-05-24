using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class LabelsToTasks
    {
        [Key] public int Id { get; set; }

        [ForeignKey("label")]
        [Column(Order = 1)]
        public virtual Labels Labels { get; set; }
        public string label { get; set; }
        [ForeignKey("taskID")]
        [Column(Order = 2)]
        public virtual Tasks Tasks { get; set; }
        public int taskID { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public LabelsToTasks()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}