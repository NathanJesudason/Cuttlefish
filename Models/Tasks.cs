using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class Tasks
    {
        [Key]
        public int id {get; set;}
        [ForeignKey("Sprints")]
        public int sprintID { get; set; }
        public string name {get; set;}
        [ForeignKey("TeamMembers")]
        public int assignee {get; set;}
        public int storyPoints {get; set;}
        public string description {get; set;}
        public string progress {get; set;}
        public string startDate {get; set;}
        public string endDate {get; set;}
        public int priority { get; set;}
        public string type { get; set;}
        public double cost { get; set;}

        #pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Tasks()
        #pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}