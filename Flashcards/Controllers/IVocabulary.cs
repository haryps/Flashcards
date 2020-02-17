using System;
using System.Collections.Generic;

namespace Flashcards.Controllers
{
    public interface IVocabulary
    {
        IEnumerable<Card> GetVocabs(int deck);
    }
}