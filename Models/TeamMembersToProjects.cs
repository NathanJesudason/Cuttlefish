using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class TeamMembersToProjects
    {
        [Key] public int Id { get; set; }
        [ForeignKey("teamMemberID")]
        [Column(Order = 1)]
        public virtual TeamMembers TeamMembers { get; set; }
        public int teamMemberID { get; set; }
        [ForeignKey("projectID")]
        [Column(Order = 2)]
        public virtual Projects Projects { get; set; }
        public int projectID { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public TeamMembersToProjects()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}