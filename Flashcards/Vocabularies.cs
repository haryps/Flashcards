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

                Dictionary<string, string> pairs = new Dictionary<string, string>();
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    var values = line.Split(',');

                    pairs.Add(values[0].Trim(), values[1].Trim());
                }
            }
        }
    }
}
