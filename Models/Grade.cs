using System;

namespace QuickGrades
{
    public class Grade {
        public int Id { get; set; }
        public double Value { get; set; }
        public string Class { get; set; }
        public string Description { get; set; }

        public string CreatorName { get; set; }
    }
}