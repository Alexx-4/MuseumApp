using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Core.Entities;
using MuseumApp.Core.Interfaces;

namespace MuseumApp.Services.CRUDService
{
    public abstract class CRUDService<TEntity> where TEntity : BaseEntity
    {
        protected IRepository<TEntity> repository;
        protected IUnitOfWork unitOfWork;
        public CRUDService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = unitOfWork.Set<TEntity>();
        }

        public virtual void Add(TEntity obj)
        {
            repository.Add(obj);
            unitOfWork.SaveChanges();
        }

        public virtual void Remove(TEntity obj)
        {
            repository.Remove(obj);
            unitOfWork.SaveChanges();
        }

        public virtual void Update(TEntity obj)
        {
            repository.Update(obj);
            unitOfWork.SaveChanges();
        }

        public virtual DbSet<TEntity> GetAll()
        {
            return repository.GetAll();
        }

        public virtual object? Find(int? id)
        {
            if (id == null)
                return null;
            return repository.Find(id);
        }
    }
}