using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cuttlefish.Models
{
    public class TeamMembers
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string roles { get; set; }
        public string avatar { get; set; }
        public string token { get; set; }
        //public string name { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public TeamMembers()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }
    }

}