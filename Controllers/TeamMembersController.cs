using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cuttlefish.Models;
using System.Text.RegularExpressions;
using System.Text;
using Cuttlefish.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Cuttlefish.Data;

namespace Cuttlefish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMembersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamMembersController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] TeamMembers teammemberObj) // will be sending a body (username and password)
        {
            if (teammemberObj == null)
            {
                return BadRequest(new { Message = "teammemberobj is null" });
            }

            var teammember = await _context.TeamMembers.FirstOrDefaultAsync(x => x.username == teammemberObj.username); // && x.Password == teammemberObj.Password);

            if (teammember == null)
            {
                return Unauthorized(new { Message = "Invalid username" });
            }
            if (!PasswordHasher.VerifyPassword(teammemberObj.password, teammember.password))
            {
                return Unauthorized(new { Message = "Invalid password" });
            }

            teammember.token = CreateJwtToken(teammember);



            return Ok(new
            {
                Token = teammember.token,
                Message = "Login Success"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterTeammember([FromBody] TeamMembers teammemberObj)
        {
            if (teammemberObj == null)
            {
                return BadRequest();
            }

            //check username
            if (await CheckUserNameExistAsync(teammemberObj.username))
            {
                return Conflict(new { Message = "Username already taken" });
            }
            //check email
            if (await CheckEmailExistAsync(teammemberObj.email))
            {
                return Conflict(new { Message = "Email already taken" });
            }

            teammemberObj.password = PasswordHasher.HashPassword(teammemberObj.password); // hash password in Authentication 
            teammemberObj.roles = "User";
            teammemberObj.token = "";
            await _context.TeamMembers.AddAsync(teammemberObj);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Team member registered" });
        }

        private async Task<bool> CheckUserNameExistAsync(string username)
        {
            return await _context.TeamMembers.AnyAsync(x => x.username == username);
        }

        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _context.TeamMembers.AnyAsync(x => x.email == email);
        }

        // GET: api/TeamMembers
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamMembers>>> GetTeamMembers_1()
        {
            return await _context.TeamMembers.ToListAsync();
        }

        // GET: api/TeamMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamMembers>> GetTeamMembers(int id)
        {
            var teamMembers = await _context.TeamMembers.FindAsync(id);

            if (teamMembers == null)
            {
                return NotFound();
            }

            return teamMembers;
        }

        // PUT: api/TeamMembers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeamMembers(int id, TeamMembers teamMembers)
        {
            if (id != teamMembers.id)
            {
                return BadRequest();
            }

            _context.Entry(teamMembers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamMembersExists(id))
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

        // POST: api/TeamMembers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TeamMembers>> PostTeamMembers(TeamMembers teamMembers)
        {
            _context.TeamMembers.Add(teamMembers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeamMembers", new { id = teamMembers.id }, teamMembers);
        }

        // DELETE: api/TeamMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamMembers(int id)
        {
            var teamMembers = await _context.TeamMembers.FindAsync(id);
            if (teamMembers == null)
            {
                return NotFound();
            }

            _context.TeamMembers.Remove(teamMembers);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeamMembersExists(int id)
        {
            return _context.TeamMembers.Any(e => e.id == id);
        }

        private string CreateJwtToken(TeamMembers teammember)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("secretkeygoeshere");
            var identity = new ClaimsIdentity(new Claim[]  //payload in JWT
            {
                new Claim(ClaimTypes.Role, teammember.roles),
                new Claim(ClaimTypes.Name,teammember.username)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDecriptor = new SecurityTokenDescriptor
            {
                Subject = identity,

                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = credentials,
            };
            var token = jwtTokenHandler.CreateToken(tokenDecriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
