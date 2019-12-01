using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Flashcards.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeckController : ControllerBase
    {
        private readonly ILogger<DeckController> _logger;

        public DeckController(ILogger<DeckController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Card> Get()
        {
            yield return new Card() { DeckId = 1, Word = "abacus", Definition = "frame with balls for calculating" };
            yield return new Card() { DeckId = 1, Word = "abate", Definition = "to lessen to subside" };
        }
    }
}
