using System;
using Microsoft.EntityFrameworkCore;

namespace Library
{
    public class AuthorContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=Library.db");

        public DbSet<Author> Users { get; set; }
    }
}