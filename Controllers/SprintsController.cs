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

            if (await _context.Projects.FindAsync(sprints.projectID) != null)
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

        // PATCH: api/Sprints/5/reorder
        [HttpPatch("{id}/swap-reorder")]
        public async Task<IActionResult> SwapReorderTasksInSprint(int id, [FromBody] SwapReorderBody body)
        {
            Sprints sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null)
            {
                return NotFound(new { message = "Sprint with given id not found" });
            }
            
            Tasks task = await _context.Tasks.FindAsync(body.taskId);
            if (task == null)
            {
                return NotFound(new { message = "Task with given id not found" });
            }

            int oldOrder = task.order;
            int newOrder = body.newOrder;
            if (oldOrder == newOrder)
            {
                return Ok();
            }

            if (oldOrder < newOrder)
            {
                // item moved down the list, items between orders need to move up (decrement order)
                _context.Database.ExecuteSqlRaw("UPDATE [Tasks] SET [order] = [order]-1 WHERE [sprintID] = {0} AND [order] > {1} AND [order] <= {2};", id, oldOrder, newOrder);
            }
            else
            {
                // item moved up the list, items between orders need to move down (increment order)
                _context.Database.ExecuteSqlRaw("UPDATE [Tasks] SET [order] = [order]+1 WHERE [sprintID] = {0} AND [order] < {1} AND [order] >= {2};", id, oldOrder, newOrder);
            }

            _context.Database.ExecuteSqlRaw("UPDATE Tasks SET [order] = {0} WHERE [id] = {1};", newOrder, body.taskId);
            
            return Ok();
        }

        public class SwapReorderBody
        {
            public int taskId { get; set; }
            public int newOrder { get; set; }
        }

        // PATCH: api/Sprints/5/reorder
        [HttpPatch("{id}/remove-reorder")]
        public async Task<IActionResult> RemoveReorderTasksInSprint(int id, [FromBody] RemoveReorderBody body)
        {
            Sprints sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null)
            {
                return NotFound(new { message = "Sprint with given id not found" });
            }

            int oldOrder = body.oldOrder;

            _context.Database.ExecuteSqlRaw("UPDATE [Tasks] SET [order] = [order]-1 WHERE [sprintID] = {0} AND [order] > {1};", id, oldOrder);

            return Ok();
        }

        public class RemoveReorderBody
        {
            public int oldOrder { get; set; }
        }

        [HttpPatch("{id}/add-reorder")]
        public async Task<IActionResult> AddReorderTasksInSprint(int id, [FromBody] AddReorderBody body)
        {
            Sprints sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null)
            {
                return NotFound(new { message = "Sprint with given id not found" });
            }

            int newOrder = body.newOrder;

            _context.Database.ExecuteSqlRaw("UPDATE [Tasks] SET [order] = [order]+1 WHERE [sprintID] = {0} AND [order] >= {1};", id, newOrder);

            return Ok();
        }

        public class AddReorderBody
        {
            public int newOrder { get; set; }
        }

        private bool SprintsExists(int id)
        {
            return _context.Sprints.Any(e => e.id == id);
        }
    }
}
