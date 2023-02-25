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
using System.Security.Cryptography;
using Cuttlefish.EmailService;
using Cuttlefish.Email;
using Cuttlefish.EmailService.Utility;
using Cuttlefish.Models.Dtos;

namespace Cuttlefish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMembersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;

        public TeamMembersController(ApplicationDbContext context, IConfiguration config, IEmailService emailService)
        {
            _context = context;
            _config = config;
            _emailService = emailService;
        }


        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] TeamMembers teammemberObj) // will be sending a body (username and password)
        {
            if (teammemberObj == null)
            {
                return BadRequest(new { Message = "teammemberobj is null" });
            }

            var teammember = await _context.TeamMembers.FirstOrDefaultAsync(x => x.username == teammemberObj.username); // && x.Password == teammemberObj.Password);

            var teammember_email = await _context.TeamMembers.FirstOrDefaultAsync(x => x.email == teammemberObj.username);


            if (teammember == null)
            {
                if(teammember_email == null)
                {
                    return NotFound(new { Message = "User Not Found" });
                }
                else
                {
                    teammember = teammember_email;
                }
            }
            if (!PasswordHasher.VerifyPassword(teammemberObj.password, teammember.password))
            {
                return BadRequest(new { Message = "Username or Password is incorrect" });
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
                return BadRequest(new { Message = "Username Already Exists" });
            }
            //check email
            if (await CheckEmailExistAsync(teammemberObj.email))
            {
                return BadRequest(new { Message = "Email Already Exists" });
            }

            //check password strength
            var password = CheckPasswordStrength(teammemberObj.password);
            if (!string.IsNullOrEmpty(password))
            {
                return BadRequest(new { Message = password.ToString() });
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

        // GET: api/TeamMembers
        [Authorize]
        [HttpGet]
        public IQueryable<TeamMemberDto> GetTeamMembers_1()
        {
            var teamMembers = from t in _context.TeamMembers
                              select new TeamMemberDto()
                              {
                                  username = t.username,
                                  email = t.email,
                                  roles = t.roles
                              };

            //return await _context.TeamMembers.ToListAsync();
            return teamMembers;

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

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var teammember = await _context.TeamMembers.FirstOrDefaultAsync(t => t.email == email);
            if (teammember is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Email is not registered"
                });
            }

            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            teammember.resetPasswordToken = emailToken;
            teammember.resetPasswordExpire = DateTime.UtcNow.AddHours(24);
            string from = _config["EmailSettings:From"];
            var emailModel = new EmailModel(email, "Reset Password", EmailBody.EmailStringBody(email, emailToken));
            _emailService.SendEmail(emailModel);
            //update teammember
            _context.Entry(teammember).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(
                    new
                    {
                        StatusCode = 200,
                        Message = "Email sent"
                    }
                );
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
            var teammember = await _context.TeamMembers.AsNoTracking().FirstOrDefaultAsync(t => t.email == resetPasswordDto.Email);
            if (teammember is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Email is not registered"
                });
            }
            var tokenCode = teammember.resetPasswordToken;
            DateTime emailTokenExpire = teammember.resetPasswordExpire;
            if (tokenCode != newToken || DateTime.UtcNow > emailTokenExpire)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = "Invalid reset link"
                });
            }
            teammember.password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
            _context.Entry(teammember).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(
                    new
                    {
                        StatusCode = 200,
                        Message = "Password was reset"
                    }
                );
        }
    }
}
