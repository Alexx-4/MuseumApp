using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MuseumApp.Core.Entities;
using MuseumApp.Infrastructure.Repository;

namespace MuseumApp.Infrastructure.DataContexts
{
    public class ApplicationDbContext : UnitOfWork
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        DbSet<Museum>? Museums {get;set;}
        DbSet<Article>? Articles {get;set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(conf =>
            {
                conf.Ignore(CoreEventId.DetachedLazyLoadingWarning);
                conf.Ignore(CoreEventId.LazyLoadOnDisposedContextWarning);
            });
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}