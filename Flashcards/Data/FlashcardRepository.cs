using Flashcards.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Data
{
    public class FlashcardRepository : IFlashcardRepository
    {
        private readonly ApplicationDbContext _context;

        public FlashcardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Progression>> GetUserDeck(int deckId)
        {
            var progress = _context.Progressions.Where(x => x.DeckId == deckId).ToListAsync();

            return progress;
        }
    }
}
