using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SmartTask.Model
{
    public class ProjectItem
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        [JsonIgnore]
        public List<TaskItem>? Tasks { get; set; }
    }
}
