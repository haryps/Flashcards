using Flashcards.Controllers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards.Controllers
{
    public class Vocabularies : IVocabulary
    {
        private Dictionary<int, IEnumerable<Card>> VocabDictionary;

        public Vocabularies()
        {
            using (var sr = new StreamReader(@"Resource\wordlist.csv"))
            {                
                sr.ReadLine();  //Skip the header

                List<Card> vocabs = new List<Card>();
                VocabDictionary = new Dictionary<int, IEnumerable<Card>>();

                int counter = 0;
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    var values = line.Split(',');

                    vocabs.Add(new Card() { Word = values[0].Trim(), Definition = values[1].Trim() });

                    counter++;
                }

                int cards = vocabs.Count / AppConst.DECKNUMS + 1;
                for (int i = 0; i < AppConst.DECKNUMS; i++)
                {
                    List<Card> segment = new List<Card>();

                    int startIndex = i * cards;
                    for (int j = startIndex; j < vocabs.Count && j < startIndex + cards; j++)
                    {
                        segment.Add(vocabs[j]);
                    }

                    VocabDictionary.Add(i + 1, segment);
                }
            }
        }

        public IEnumerable<Card> GetVocabs(int deck)
        {
            return VocabDictionary[deck];
        }
    }
}
