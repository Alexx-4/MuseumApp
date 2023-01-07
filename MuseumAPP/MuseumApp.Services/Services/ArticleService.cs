using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MuseumApp.Core.Entities;
using MuseumApp.Core.Interfaces;
using MuseumApp.Services.CRUDService;
using MuseumApp.Services.ServiceInterfaces;

namespace MuseumApp.Services.Services
{
    public class ArticleService : CRUDService<Article>, IArticleService
    {
        public ArticleService(IUnitOfWork unitOfWork) : base(unitOfWork){}

        public IEnumerable<Article> ArticlesPerMuseum(int museumId)
        {
            var articles = GetAll().Where(a=>a.MuseumId == museumId).ToList();
            return articles;
        }

        public CRUDService<Article> GetCRUD()
        {
            return this;
        }
    }
}