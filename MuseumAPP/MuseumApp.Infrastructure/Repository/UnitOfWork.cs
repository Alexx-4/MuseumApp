using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Core.Entities;
using MuseumApp.Core.Interfaces;

namespace MuseumApp.Infrastructure.Repository
{
    public abstract class UnitOfWork : DbContext , IUnitOfWork
    {
         protected UnitOfWork(DbContextOptions options): base(options)
        {}
        protected UnitOfWork(string connectionString) : base(GetOptions(connectionString))
        {}

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        IRepository<TEntity> IUnitOfWork.Set<TEntity>()
        {
            return new Repository<TEntity>(this);
        }

        public IRepository<TEntity> getRepo<TEntity>() where TEntity : BaseEntity
        {
            return new Repository<TEntity>(this);
        }
    }
}