using System;
using Microsoft.EntityFrameworkCore;

namespace QuickGrades
{
    public class GradeContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=QuickGrades.db");

        public DbSet<Grade> Grades { get; set; }
    }
}