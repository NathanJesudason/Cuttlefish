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
    public class LabelsToTasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LabelsToTasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LabelsToTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LabelsToTasks>>> GetLabelsToTasks()
        {
            return await _context.LabelsToTasks.ToListAsync();
        }

        // GET: api/LabelsToTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LabelsToTasks>> GetLabelsToTasks(int id)
        {
            var labelsToTasks = await _context.LabelsToTasks.FindAsync(id);

            if (labelsToTasks == null)
            {
                return NotFound();
            }

            return labelsToTasks;
        }

        // PUT: api/LabelsToTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabelsToTasks(int id, LabelsToTasks labelsToTasks)
        {
            if (id != labelsToTasks.Id)
            {
                return BadRequest();
            }

            _context.Entry(labelsToTasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabelsToTasksExists(id))
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

        // POST: api/LabelsToTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LabelsToTasks>> PostLabelsToTasks(LabelsToTasks labelsToTasks)
        {
            _context.LabelsToTasks.Add(labelsToTasks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLabelsToTasks", new { id = labelsToTasks.Id }, labelsToTasks);
        }

        // DELETE: api/LabelsToTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLabelsToTasks(int id)
        {
            var labelsToTasks = await _context.LabelsToTasks.FindAsync(id);
            if (labelsToTasks == null)
            {
                return NotFound();
            }

            _context.LabelsToTasks.Remove(labelsToTasks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LabelsToTasksExists(int id)
        {
            return _context.LabelsToTasks.Any(e => e.Id == id);
        }
    }
}
