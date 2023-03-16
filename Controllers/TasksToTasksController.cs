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
    public class TasksToTasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksToTasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TasksToTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TasksToTasks>>> GetTasksToTasks()
        {
            return await _context.TasksToTasks.ToListAsync();
        }

        // GET: api/TasksToTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TasksToTasks>> GetTasksToTasks(int id)
        {
            var tasksToTasks = await _context.TasksToTasks.FindAsync(id);

            if (tasksToTasks == null)
            {
                return NotFound();
            }

            return tasksToTasks;
        }

        // PUT: api/TasksToTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTasksToTasks(int id, TasksToTasks tasksToTasks)
        {
            if (id != tasksToTasks.Id)
            {
                return BadRequest();
            }

            _context.Entry(tasksToTasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksToTasksExists(id))
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

        // POST: api/TasksToTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TasksToTasks>> PostTasksToTasks(TasksToTasks tasksToTasks)
        {
            if (tasksToTasks == null)
            {
                return NotFound();
            }
            //check if unique
            var check = _context.TasksToTasks.Where(i => i.independentTaskID == tasksToTasks.independentTaskID && i.dependentTaskID == tasksToTasks.dependentTaskID).FirstAsync().Result;
            //check if IDs are valid
            var validIDs = _context.Tasks.Any(i => i.id.Equals(tasksToTasks.independentTaskID)) && _context.TasksToTasks.Any(i => i.Id.Equals(tasksToTasks.dependentTaskID));
            if (check == null && validIDs)
            {
                _context.TasksToTasks.Add(tasksToTasks);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTasksToTasks", new { id = tasksToTasks.Id }, tasksToTasks);

            }
            return NotFound();
        }

        // DELETE: api/TasksToTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTasksToTasks(int id)
        {
            var tasksToTasks = await _context.TasksToTasks.FindAsync(id);
            if (tasksToTasks == null)
            {
                return NotFound();
            }

            _context.TasksToTasks.Remove(tasksToTasks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TasksToTasks/inID/depID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTasksToTasksByIDS(int independentID, int dependentID)
        {
            var tasksToTasks = _context.TasksToTasks.Where(i => i.independentTaskID == independentID && i.dependentTaskID == dependentID).FirstAsync().Result;
            if (tasksToTasks == null)
            {
                return NotFound();
            }

            _context.TasksToTasks.Remove(tasksToTasks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TasksToTasksExists(int id)
        {
            return _context.TasksToTasks.Any(e => e.Id == id);
        }
    }
}
