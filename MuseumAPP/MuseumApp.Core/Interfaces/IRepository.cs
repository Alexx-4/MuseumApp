using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Core.Entities;

namespace MuseumApp.Core.Interfaces
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        IUnitOfWork UnitOfWork { get; }

        TEntity Add(TEntity item);
        TEntity Remove(TEntity item);
        TEntity Update(TEntity item);
        DbSet<TEntity> GetAll();
        TEntity? Find(params object[] entityKeyValues);
    }
}