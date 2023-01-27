using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Cuttlefish.Models
{
    public class TeamMember
    {
        [Key]
        public int Team_memberID { get; set; }

        [Column(TypeName = "nvarchar(32)")]
        public string Username { get; set; }

        [Column(TypeName = "nvarchar(127)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(254)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(32)")]
        public string Role { get; set; }
        public string Token { get; set; }


    }
}
