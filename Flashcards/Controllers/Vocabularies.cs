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
        private Dictionary<int, IEnumerable<Tuple<string, string>>> VocabDictionary;

        public Vocabularies()
        {
            using (var sr = new StreamReader(@"Resource\wordlist.csv"))
            {                
                sr.ReadLine();  //Skip the header

                List<Tuple<string, string>> vocabs = new List<Tuple<string, string>>();
                VocabDictionary = new Dictionary<int, IEnumerable<Tuple<string, string>>>();

                int counter = 0;
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    var values = line.Split(',');

                    vocabs.Add(new Tuple<string, string>(values[0].Trim(), values[1].Trim()));

                    counter++;
                }

                int cards = vocabs.Count / AppConst.DECKNUMS + 1;
                for (int i = 0; i < AppConst.DECKNUMS; i++)
                {
                    List<Tuple<string, string>> segment = new List<Tuple<string, string>>();

                    int startIndex = i * cards;
                    for (int j = startIndex; j < vocabs.Count && j < startIndex + cards; j++)
                    {
                        segment.Add(vocabs[j]);
                    }

                    VocabDictionary.Add(i + 1, segment);
                }
            }
        }

        public IEnumerable<Tuple<string, string>> GetVocabs(int deck)
        {
            return VocabDictionary[deck];
        }
    }
}
