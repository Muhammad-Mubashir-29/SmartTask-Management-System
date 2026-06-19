using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartTask.Data;
using SmartTask.Model;

namespace SmartTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly Context context;

        public TaskController(Context _context)
        {
            context = _context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskItem>>> GetTasks()
        {
            return await context.Tasks
                .Include(t => t.ProjectItem)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            context.Tasks.Add(task);

            await context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, TaskItem task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            context.Entry(task).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var task = await context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            context.Tasks.Remove(task);

            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
