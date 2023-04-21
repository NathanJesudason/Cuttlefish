using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cuttlefish.Data;
using Cuttlefish.Models;
using Microsoft.Build.Framework;

namespace Cuttlefish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SprintsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SprintsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sprints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sprints>>> GetSprints()
        {
            return await _context.Sprints.ToListAsync();
        }

        // GET: api/Sprints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sprints>> GetSprints(int id)
        {
            var sprints = await _context.Sprints.FindAsync(id);

            if (sprints == null)
            {
                return NotFound();
            }

            return sprints;
        }

        // PUT: api/Sprints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSprints(int id, Sprints sprints)
        {
            if (id != sprints.id)
            {
                return BadRequest();
            }

            _context.Entry(sprints).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SprintsExists(id))
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

        // POST: api/Sprints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sprints>> PostSprints(Sprints sprints)
        {

            if (await _context.Projects.FindAsync(sprints.ProjectsID) != null)
            {
                _context.Sprints.Add(sprints);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSprints", new { id = sprints.id }, sprints);
            }

            return BadRequest();
        }

        // DELETE: api/Sprints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSprints(int id)
        {
            var sprints = await _context.Sprints.FindAsync(id);
            if (sprints == null)
            {
                return NotFound();
            }

            _context.Sprints.Remove(sprints);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SprintsExists(int id)
        {
            return _context.Sprints.Any(e => e.id == id);
        }
    }
}
