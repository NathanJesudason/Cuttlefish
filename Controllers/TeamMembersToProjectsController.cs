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
    public class TeamMembersToProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamMembersToProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TeamMembersToProjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamMembersToProjects>>> GetTeamMembersToProjects()
        {
            return await _context.TeamMembersToProjects.ToListAsync();
        }

        // GET: api/TeamMembersToProjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamMembersToProjects>> GetTeamMembersToProjects(int id)
        {
            var teamMembersToProjects = await _context.TeamMembersToProjects.FindAsync(id);

            if (teamMembersToProjects == null)
            {
                return NotFound();
            }

            return teamMembersToProjects;
        }

        // GET: api/TeamMembersToProjects/2/2
        [HttpGet("{teammemberId}/{projectId}")]
        public async Task<ActionResult<TeamMembersToProjects>> GetTeamMembersToProjectsID(int teammemberId, int projectId)
        {
            var teammember = await _context.TeamMembers.FindAsync(teammemberId);
            var project = await _context.Projects.FindAsync(projectId);
            if (teammember == null || project == null) { 
                return NotFound();
            }

            var id = await _context.TeamMembersToProjects.FirstOrDefaultAsync(x => x.teamMemberID == teammemberId && x.projectID == projectId);

            if (id != null)
            {
                return id;
            }
            else
            {
                return NotFound();
            }

        }

        // PUT: api/TeamMembersToProjects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeamMembersToProjects(int id, TeamMembersToProjects teamMembersToProjects)
        {
            if (id != teamMembersToProjects.Id)
            {
                return BadRequest();
            }

            if (await _context.Projects.FindAsync(teamMembersToProjects.projectID) == null)
            {
                return BadRequest();
            }

            if (await _context.TeamMembers.FindAsync(teamMembersToProjects.teamMemberID) == null)
            {
                return BadRequest();
            }

            _context.Entry(teamMembersToProjects).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamMembersToProjectsExists(id))
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

        // POST: api/TeamMembersToProjects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TeamMembersToProjects>> PostTeamMembersToProjects(TeamMembersToProjects teamMembersToProjects)
        {
            if (await _context.Projects.FindAsync(teamMembersToProjects.projectID) == null)
            {
                return BadRequest();
            }

            if (await _context.TeamMembers.FindAsync(teamMembersToProjects.teamMemberID) == null)
            {
                return BadRequest();
            }

            _context.TeamMembersToProjects.Add(teamMembersToProjects);
            try
            {
                await _context.SaveChangesAsync();
               
            }
            catch 
            {
                return Conflict(new {error = "That user is already assigned to project!"});
            }

            return CreatedAtAction("GetTeamMembersToProjects", new { id = teamMembersToProjects.Id }, teamMembersToProjects);
        }

        // DELETE: api/TeamMembersToProjects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamMembersToProjects(int id)
        {
            var teamMembersToProjects = await _context.TeamMembersToProjects.FindAsync(id);
            if (teamMembersToProjects == null)
            {
                return NotFound();
            }

            _context.TeamMembersToProjects.Remove(teamMembersToProjects);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Team member deleted from project!" });
        }

        private bool TeamMembersToProjectsExists(int id)
        {
            return _context.TeamMembersToProjects.Any(e => e.Id == id);
        }
    }
}
