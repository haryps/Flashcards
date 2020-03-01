﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Flashcards.Data;
using IdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Flashcards.Controllers
{

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

        [EnableCors("spaclient")]
        [HttpGet("DeckNum")]
        public IEnumerable<IEnumerable<Card>> DeckNum()
        {
            var vocabulary = new List<List<Card>>();
            for (int i = 1; i <= AppConst.DECKNUMS; i++)
            {
                var cards = _vocabulary.GetVocabs(i).ToList();
                vocabulary.Add(cards);
            }

            return vocabulary;
        }

        [EnableCors("spaclient")]
        [HttpGet("decknum/{id}")]
        public IEnumerable<Card> GetDeckNumCollection(int id)
        {
            var cards = _vocabulary.GetVocabs(id);

            return cards;
        }

        [Authorize]
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
