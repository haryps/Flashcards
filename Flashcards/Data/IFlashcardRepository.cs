using IdentityServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Data
{
    public interface IFlashcardRepository
    {
        Task<List<Progression>> GetUserDeck(int deckId);
    }
}
