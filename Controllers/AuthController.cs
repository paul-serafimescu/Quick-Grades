using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

/* Logs each request to console by following format
   METHOD [endpoint] <status code> [Local Date String]
   ex:
   GET /users <200> 9/29/2020 10:18:44 AM
*/

namespace Library.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase {

        private AuthorContext Users = new AuthorContext();

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger) {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Author>> Get() {
            Console.WriteLine($"GET /users <200> {DateTime.Now}");
            return await Users.Users.ToListAsync();
        }

        [HttpPost]
        public IActionResult Login(Author user) {
            Func<Author, bool> authCheck = entry => entry.Password == user.Password && entry.Username == user.Username;
            if(Users.Users.Any(authCheck)) {
                var queryItem = Users.Users.Where(authCheck).FirstOrDefault();
                Console.WriteLine($"POST /users <200> {queryItem.Username} {DateTime.Now}");
                return Ok(queryItem);
            }
            Console.WriteLine($"POST /users <400> {DateTime.Now}");
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> CreateUser(Author newUser) {
            if(Users.Users.Any(e => e.Username == newUser.Username)) {
                Console.WriteLine($"POST /users/create <400> {DateTime.Now}");
                return BadRequest("username taken");
            }
            Console.WriteLine($"POST /users/create <200> {newUser.Username} {DateTime.Now}");
            Users.Add(newUser);
            await Users.SaveChangesAsync();
            return Ok(newUser);
        }

        [Route("{id:int}")]
        public async Task<Author> Get(int id) {
            Console.WriteLine($"GET /users/{id} <200> {DateTime.Now}");
            return await Users.Users.FindAsync(id);
        }
    }
}