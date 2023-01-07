using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MuseumApp.Core.Entities;
using MuseumApp.Core.Models;
using MuseumApp.Services.ServiceInterfaces;

namespace MuseumApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        IArticleService _articleService {get;set;}

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet, Route("GetArticles")]
        public IActionResult GetArticles()
        {
           try{
                var allArticles = _articleService.GetCRUD().GetAll().ToList();
                return Ok(allArticles);
           }
           catch {
                System.Console.WriteLine("Database error in getArticles");
                return BadRequest("Internal Error");
           }
            
        }

        [HttpGet, Route("ArticlesPerMuseum")]
        public IActionResult ArticlesPerMuseum(int museumId)
        {
            try
            {
                var articles = _articleService.ArticlesPerMuseum(museumId);
                return Ok(articles);
            }
            catch{
                System.Console.WriteLine("Error in articles per museum");
                return BadRequest("Internal Error");
            }
        }

        [HttpPost, Route("Create")]
        public IActionResult CreateArticle(ArticleViewModel article)
        {
            try{
                Article entity = new Article {
                    Name = article.Name,
                    Description = article.Description,
                    Damaged = article.Damaged,
                    MuseumId = article.MuseumId

                };

                _articleService.GetCRUD().Add(entity);
                return Ok(article);
            }
            catch{
                System.Console.WriteLine("Error while creating article");
                return BadRequest("Internal Error");
            }
        }

        [HttpDelete, Route("Delete")]
        public IActionResult DeleteArticle(int articleId)
        {
            try{
                Article article = (Article)_articleService.GetCRUD().Find(articleId)!;
                _articleService.GetCRUD().Remove(article!);
                return Ok(article);
            }
            catch{
                System.Console.WriteLine("Error while deleting article");
                return BadRequest("Internal Error");
            }
        }

        [HttpPut, Route("Edit")]
        public IActionResult EditArticle(ArticleViewModel article){
            try{
                Article entity = new Article{
                    Id = article.Id,
                    Name = article.Name,
                    Description = article.Description,
                    Damaged = article.Damaged,
                    MuseumId = article.MuseumId
                };

                _articleService.GetCRUD().Update(entity);
                return Ok(article);
            }
            catch{
                System.Console.WriteLine("Error while updating article");
                return BadRequest("Internal Error");
            }
        }

    }
}