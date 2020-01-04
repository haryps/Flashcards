using System;
using System.Collections.Generic;

namespace Flashcards.Controllers
{
    public interface IVocabulary
    {
        IEnumerable<Tuple<string, string>> GetVocabs(int deck);
    }
}