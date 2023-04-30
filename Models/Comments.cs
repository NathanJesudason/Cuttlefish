using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class Comments
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("teamMemberID")]
        public virtual TeamMembers TeamMembers { get; set; }
        public int teamMemberID { get; set; }
        [ForeignKey("taskID")]
        public virtual Tasks Tasks { get; set; }
        public int taskID { get; set; }
        public string date { get; set; }
        public string content { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Comments()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}