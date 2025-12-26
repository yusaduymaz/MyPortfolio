using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MyPortfolio.Models.Entity;

namespace MyPortfolio.Models
{
    public class AboutViewModel
    {
        public TblAbouts About { get; set; }
        public List<TblAboutsCards> AboutCards { get; set; }
    }
}
