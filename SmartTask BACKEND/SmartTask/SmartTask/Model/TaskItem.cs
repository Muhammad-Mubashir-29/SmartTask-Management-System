using System.ComponentModel.DataAnnotations;

namespace SmartTask.Model
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        public string Status { get; set; } = "Pending";

        public string Priority { get; set; } = "Medium";

        public int ProjectItemId { get; set; }

        public ProjectItem? ProjectItem { get; set; }
    }
}
