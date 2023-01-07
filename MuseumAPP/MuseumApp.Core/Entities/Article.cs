using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MuseumApp.Core.Entities
{
    public class Article : BaseEntity
    {
        [Required]
        [StringLength(500)]
        public string? Name{get;set;}

        [Required]
        [StringLength(1000)]
        public string? Description{get;set;}

        [Required]
        public bool? Damaged{get;set;}

        [Required]
        public int MuseumId{get;set;}

        [Required]
        public Museum? Museum{get;set;}

    }
}