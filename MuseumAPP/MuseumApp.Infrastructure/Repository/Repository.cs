using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Core.Entities;
using MuseumApp.Core.Interfaces;

namespace MuseumApp.Infrastructure.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        public Repository(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            Set = ((DbContext)unitOfWork).Set<TEntity>();
        }

        private DbSet<TEntity> Set { get; }
        public IUnitOfWork UnitOfWork { get; protected set; }

       
        public virtual TEntity Add(TEntity item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            return Set.Add(item).Entity;
        }

        public virtual TEntity? Find(params object[] entityKeyValues)
        {
            TEntity? entity = null;

            if (entityKeyValues != null && entityKeyValues.Length > 0)
                entity = Set.Find(entityKeyValues);

            return entity;
        }

        public virtual DbSet<TEntity> GetAll()
        {
            return Set;
        }


        public virtual TEntity Remove(TEntity item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));
            
            return Set.Remove(item).Entity;
        }

        public virtual TEntity Update(TEntity item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            try
            {
                Set.Attach(item);
            }
            catch { }
            ((DbContext)UnitOfWork).Entry(item).State = EntityState.Modified;
            return item;
        }
    }
}