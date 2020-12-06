using System;
using Microsoft.EntityFrameworkCore;

namespace QuickGrades
{
    public class AuthorContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=QuickGrades.db");

        public DbSet<Author> Users { get; set; }
    }
}