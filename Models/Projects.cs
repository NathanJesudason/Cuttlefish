using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class Projects
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        [MaxLength(7)]
        public string color { get; set; }
        public string description { get; set; }
        public string dueDate { get; set; }
        public double funds { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Projects()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}