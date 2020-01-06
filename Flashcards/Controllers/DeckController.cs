using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Flashcards.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DeckController : ControllerBase
    {
        private readonly ILogger<DeckController> _logger;
        private readonly IVocabulary _vocabulary;

        public DeckController(ILogger<DeckController> logger, IVocabulary vocabulary)
        {
            _logger = logger;
            _vocabulary = vocabulary;
        }

        [HttpGet]
        public IEnumerable<Card> Get()
        {
            yield return new Card() { DeckId = 1, Word = "abacus", Definition = "frame with balls for calculating" };
            yield return new Card() { DeckId = 1, Word = "abate", Definition = "to lessen to subside" };
            //return _vocabulary.GetVocabs(1);
        }
    }
}
