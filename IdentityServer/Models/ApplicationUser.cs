using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Models
{
    public class ApplicationUser : IdentityUser<int>
    {
        public List<Progression> Progressions { get; set; }
    }

    public class Progression
    {
        public int ProgressionId { get; set; }
        public int AppUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public int DeckId { get; set; }
        public string Word { get; set; }
        public bool Understand { get; set; }
    }
}
