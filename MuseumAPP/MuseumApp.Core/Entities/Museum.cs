using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MuseumApp.Core.Entities
{
    public class Museum : BaseEntity
    {
        [Required]
        [StringLength(500)]
        public string? Name { get; set; }

        [Required]
        [StringLength(500)]
        public string? Address { get; set; }

        [Required]
        [StringLength(100)]
        public string? Type { get; set; }

        public IEnumerable<Article>? Articles { get; set; }

    }   
}