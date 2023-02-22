using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cuttlefish.Data;
using Cuttlefish.Models;

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

        // GET: api/TeamMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamMembers>>> GetTeamMembers()
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
    }
}
