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
        [ForeignKey("TeamMembers")]
        [Column(Order = 1)]
        public int teamMemberID { get; set; }
        [ForeignKey("Projects")]
        [Column(Order = 2)]
        public int projectID { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public TeamMembersToProjects()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}