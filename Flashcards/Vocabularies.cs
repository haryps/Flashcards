using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Flashcards
{
    public class Vocabularies
    {
        internal static void Load()
        {
            using (var sr = new StreamReader(@"Resource\wordlist.csv"))
            {                
                sr.ReadLine();  //Skip the header

                List<Tuple<string, string>> vocabs = new List<Tuple<string, string>>();
                Dictionary<int, List<Tuple<string, string>>> vocabDictionary = new Dictionary<int, List<Tuple<string, string>>>();

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

                    vocabDictionary.Add(i + 1, segment);
                }

            }
        }
    }
}
