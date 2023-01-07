using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MuseumApp.Core.Entities;
using MuseumApp.Services.CRUDService;

namespace MuseumApp.Services.ServiceInterfaces
{
    public interface IMuseumService
    {
        CRUDService<Museum> GetCRUD();
        IEnumerable<Museum> MuseumsPerType(string type);
    }
}