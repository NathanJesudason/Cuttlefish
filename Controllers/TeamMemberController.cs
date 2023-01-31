using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cuttlefish.Models;
using Cuttlefish.Authentication;
using System.Text;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Cuttlefish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMemberController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamMemberController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] TeamMember teammemberObj) // will be sending a body (username and password)
        {
            if (teammemberObj == null)
            {
                return BadRequest();
            }

            var teammember = await _context.TeamMembers.FirstOrDefaultAsync(x => x.Username == teammemberObj.Username); // && x.Password == teammemberObj.Password);

            if (teammember == null)
            {
                return NotFound(new { Message = "User Not Found" });
            }
            if (!PasswordHasher.VerifyPassword(teammemberObj.Password, teammember.Password))
            {
                return BadRequest(new { Message = "Username or Password is incorrect" });
            }

            teammember.Token = CreateJwtToken(teammember);



            return Ok(new { 
                Token = teammember.Token,
                Message = "Login Success" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterTeammember([FromBody] TeamMember teammemberObj)
        {
            if (teammemberObj == null)
            {
                return BadRequest();
            }

            //check username
            if (await CheckUserNameExistAsync(teammemberObj.Username))
            {
                return BadRequest(new { Message = "Username Already Exists" });
            }
            //check email
            if (await CheckEmailExistAsync(teammemberObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exists" });
            }

            //check password strength
            var password = CheckPasswordStrength(teammemberObj.Password);
            if (!string.IsNullOrEmpty(password))
            {
                return BadRequest(new { Message = password.ToString() });
            }

            teammemberObj.Password = PasswordHasher.HashPassword(teammemberObj.Password); // hash password in Authentication 
            teammemberObj.Role = "User";
            teammemberObj.Token = "";
            await _context.TeamMembers.AddAsync(teammemberObj);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Team member registered" });
        }

        private async Task<bool> CheckUserNameExistAsync(string username)
        {
            return await _context.TeamMembers.AnyAsync(x => x.Username == username);
        }

        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _context.TeamMembers.AnyAsync(x => x.Email == email);
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder stringbuilder = new StringBuilder();
            if (password.Length < 8)
            {
                stringbuilder.Append("Minimum password length should be 8" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
            {
                stringbuilder.Append("Password should contain upper and lower case letters" + Environment.NewLine);
            }
            if (!Regex.IsMatch(password, "[$,&,+,,,:,;,=,?,@,#,|,',<,>,.,-,^,*,(,),%,!,{,},`,~,_,\\[,\\]]"))
            {
                stringbuilder.Append("Password should contain special character" + Environment.NewLine);
            }
            return stringbuilder.ToString();
        }



        // GET: api/TeamMember
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamMember>>> GetTeamMembers()
        {
            return await _context.TeamMembers.ToListAsync();
        }

        // GET: api/TeamMember/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamMember>> GetTeamMember(int id)
        {
            var teamMember = await _context.TeamMembers.FindAsync(id);

            if (teamMember == null)
            {
                return NotFound();
            }

            return teamMember;
        }

        // PUT: api/TeamMember/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeamMember(int id, TeamMember teamMember)
        {
            if (id != teamMember.Team_memberID)
            {
                return BadRequest();
            }

            _context.Entry(teamMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamMemberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TeamMember
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TeamMember>> PostTeamMember(TeamMember teamMember)
        {
            _context.TeamMembers.Add(teamMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeamMember", new { id = teamMember.Team_memberID }, teamMember);
        }

        // DELETE: api/TeamMember/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamMember(int id)
        {
            var teamMember = await _context.TeamMembers.FindAsync(id);
            if (teamMember == null)
            {
                return NotFound();
            }

            _context.TeamMembers.Remove(teamMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeamMemberExists(int id)
        {
            return _context.TeamMembers.Any(e => e.Team_memberID == id);
        }
        private string CreateJwtToken(TeamMember teammember) 
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("secretkeygoeshere");
            var identity = new ClaimsIdentity(new Claim[] 
            {
                new Claim(ClaimTypes.Role, teammember.Role),
                new Claim(ClaimTypes.Name,teammember.Username)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDecriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDecriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
