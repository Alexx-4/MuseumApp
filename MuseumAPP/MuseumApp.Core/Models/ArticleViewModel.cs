using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuseumApp.Core.Models
{
    public class ArticleViewModel
    {
        public int Id {get;set;}
        public string? Name { get; set; }
        public string? Description {get;set;}
        public bool? Damaged {get;set;}
        public int MuseumId{get;set;}

    }
}