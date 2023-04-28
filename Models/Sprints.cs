using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class Sprints
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("projectID")]
        public virtual Projects Projects { get; set; }
        public int projectID { get; set; }
        public string name { get; set; }
        public string goal { get; set; }
        public int storyPointsAttempted { get; set; }
        public int storyPointsCompleted { get; set; }
        public Boolean isBacklog { get; set; }
        public Boolean isCompleted { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Sprints()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}