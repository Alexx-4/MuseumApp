using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Core.Entities;
using MuseumApp.Core.Interfaces;
using MuseumApp.Services.CRUDService;
using MuseumApp.Services.ServiceInterfaces;

namespace MuseumApp.Services.Services
{
    public class MuseumService : CRUDService<Museum>, IMuseumService
    {
       public MuseumService(IUnitOfWork unitOfWork) : base(unitOfWork)
       {}

        public CRUDService<Museum> GetCRUD()
        {
            return this;
        }

        public IEnumerable<Museum> MuseumsPerType(string type)
        {
            var museums = GetAll().Where(m=>m.Type == type).ToList();
            return museums;
        }
    }
}