using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Flashcards.Data;
using Flashcards.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Flashcards.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DeckController : ControllerBase
    {
        private readonly ILogger<DeckController> _logger;
        private readonly IVocabulary _vocabulary;
        private readonly IFlashcardRepository _flashcardRepository;

        public DeckController(ILogger<DeckController> logger, IVocabulary vocabulary, IFlashcardRepository flashcardRepository)
        {
            _logger = logger;
            _vocabulary = vocabulary;
            _flashcardRepository = flashcardRepository;
        }

        [HttpGet]
        public IEnumerable<Card> Get()
        {
            yield return new Card() { DeckId = 1, Word = "abacus", Definition = "frame with balls for calculating" };
            yield return new Card() { DeckId = 1, Word = "abate", Definition = "to lessen to subside" };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Progression>>> GetCards(int id)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            if (claimsIdentity != null)
            {
                // the principal identity is a claims identity.
                // now we need to find the NameIdentifier claim
                var userIdClaim = claimsIdentity.Claims
                    .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                if (userIdClaim != null)
                {
                    var userIdValue = userIdClaim.Value;
                }
            }

            var cards = await _flashcardRepository.GetUserDeck(id);

            return cards;
        }
    }
}
