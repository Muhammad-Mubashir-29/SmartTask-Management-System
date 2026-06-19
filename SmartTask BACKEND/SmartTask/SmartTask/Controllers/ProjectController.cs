using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartTask.Data;
using SmartTask.Model;

namespace SmartTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly Context context;

        public ProjectController(Context _context)
        {
            this.context = _context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectItem>>> GetProjects()
        {
            return await context.Projects.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<ProjectItem>> CreateProject(ProjectItem project)
        {
            context.Projects.Add(project);

            await context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectItem>> GetProject(int id)
        {
            var project = await context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProject(int id, ProjectItem project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            context.Entry(project).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            var project = await context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            context.Projects.Remove(project);

            await context.SaveChangesAsync();

            return NoContent();
        }



    }
}
