using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

/* Logs each request to console by following format
   METHOD [endpoint] <status code> [Local Date String]
   ex:
   GET /grades <200> 9/29/2020 10:18:44 AM
*/

namespace Library.Controllers
{
    public class PatchObject {
        public string field {get; set; }
        public string newValue {get; set; }
    }

    [ApiController]
    [Route("grades")]
    public class GradeController : ControllerBase {

        private GradeContext _Grades = new GradeContext();

        private readonly ILogger<GradeController> _logger;

        public GradeController(ILogger<GradeController> logger) {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Grade>> Get([FromQuery(Name = "username")] string user) {
            if(user == null) return new List<Grade>();
            Console.WriteLine($"GET /grades <200> {DateTime.Now}");
            return await _Grades.Grades
              .Where(entry => entry.CreatorName == user)
              .OrderBy(entry => entry.Class.ToUpper())
              .ToListAsync();
        }

        public async Task<IActionResult> CreateGrade(Grade newGrade) {
            if(newGrade.Value > 100 || newGrade.Value < 0)
                return BadRequest("invalid % value");
            _Grades.Grades.Add(newGrade);
            await _Grades.SaveChangesAsync();
            return Ok(newGrade);
        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id) {
            Console.WriteLine($"DELETE /grades/{id} <200> {DateTime.Now}");
            _Grades.Grades.Remove(_Grades.Grades.Find(id));
            await _Grades.SaveChangesAsync();
            return Ok(200);
        }

        [Route("{id:int}")]
        [HttpGet]
        public async Task<Grade> Get(int id) {
            Console.WriteLine($"GET /grades/{id} <200> {DateTime.Now}");
            return await _Grades.Grades.FindAsync(id);
        }

        [Route("{id:int}")]
        [HttpPatch]
        public async Task<IActionResult> Patch(int id, [FromBody] PatchObject data) {
            Grade grade = _Grades.Grades.Find(id);
            switch(data.field) {
                case "c":
                    grade.Class = data.newValue;
                    break;
                case "v":
                    grade.Value = double.Parse(data.newValue);
                    break;
                case "d":
                    grade.Description = data.newValue;
                    break;
                default:
                    Console.WriteLine($"PATCH /grades/{id} <422> {DateTime.Now}");
                    return StatusCode(422);
            }
            Console.WriteLine($"PATCH /grades/{id} <200> {DateTime.Now}");
            await _Grades.SaveChangesAsync();
            return Ok(200);
        }
    }
}