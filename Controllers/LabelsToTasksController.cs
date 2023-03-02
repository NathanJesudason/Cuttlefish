using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cuttlefish.Data;
using Cuttlefish.Models;
using NuGet.Versioning;

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

        // GET: api/LabelsToTasks/5/labels
        [HttpGet("{taskID}/labels")]
        public async Task<ActionResult<IEnumerable<LabelsToTasks>>> GetLabelsToTasksByTaskID(int taskID)
        {
            var labelsToTasks = await _context.LabelsToTasks.Where(l => l.taskID == taskID).ToListAsync();

            if (labelsToTasks == null)
            {
                return NotFound();
            }

            return labelsToTasks;
        }

        // GET: api/LabelsToTasks/sprint/tasks
        [HttpGet("{label}/tasks")]
        public async Task<ActionResult<IEnumerable<LabelsToTasks>>> GetLabelsToTasksByLabel(string label)
        {
            var labelsToTasks = await _context.LabelsToTasks.Where(l => l.label == label).ToListAsync();

            if (labelsToTasks == null)
            {
                return NotFound();
            }

            return labelsToTasks;
        }

        // POST: api/LabelsToTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LabelsToTasks>> PostLabelsToTasks(LabelsToTasks labelsToTasks)
        {

            if (await _context.Labels.FindAsync(labelsToTasks.label) == null)
            {
                return BadRequest();
            }

            if (await _context.Tasks.FindAsync(labelsToTasks.taskID) == null)
            {
                return BadRequest();
            }

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
