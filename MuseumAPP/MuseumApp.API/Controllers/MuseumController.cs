using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MuseumApp.Core.Entities;
using MuseumApp.Services.ServiceInterfaces;

namespace MuseumApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MuseumController : ControllerBase
    {
        IMuseumService _museumService{get; set;}
        public MuseumController(IMuseumService museumService)
        {
            _museumService = museumService;
        }

        [HttpGet, Route("GetMuseums")]
        public IActionResult GetMuseums()
        {
           try{
                var allMuseums = _museumService.GetCRUD().GetAll().ToList();
                return Ok(allMuseums);
           }
           catch {
                System.Console.WriteLine("Database error in getMuseums");
                return BadRequest("Internal Error");
           }
            
        }

        [HttpGet, Route("MuseumsPerType")]
        public IActionResult MuseumsPerType(string type)
        {
            try
            {
                var museums = _museumService.MuseumsPerType(type);
                return Ok(museums);
            }
            catch{
                System.Console.WriteLine("Error in museums per type");
                return BadRequest("Internal Error");
            }
        }

        [HttpPost, Route("Create")]
        public IActionResult CreateMuseum(Museum museum)
        {
            try{
                _museumService.GetCRUD().Add(museum);
                return Ok(museum);
            }
            catch{
                System.Console.WriteLine("Error while creating museum");
                return BadRequest("Internal Error");
            }
        }

        [HttpDelete, Route("Delete")]
        public IActionResult DeleteMuseum(Museum museum)
        {
            try{
                _museumService.GetCRUD().Remove(museum);
                return Ok(museum);
            }
            catch{
                System.Console.WriteLine("Error while deleting museum");
                return BadRequest("Internal Error");
            }
        }

        [HttpPut, Route("Edit")]
        public IActionResult EditMuseum(Museum museum){
            try{
                _museumService.GetCRUD().Update(museum);
                return Ok(museum);
            }
            catch{
                System.Console.WriteLine("Error while updating museum");
                return BadRequest("Internal Error");
            }
        }

    }
}