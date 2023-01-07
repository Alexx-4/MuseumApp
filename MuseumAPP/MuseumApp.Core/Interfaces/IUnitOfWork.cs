using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MuseumApp.Core.Entities;

namespace MuseumApp.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        int SaveChanges();
        IRepository<TEntity> Set<TEntity>() where TEntity : BaseEntity;
    }
}