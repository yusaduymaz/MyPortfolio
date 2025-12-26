using MyPortfolio.Models.Entity;
using MyPortfolio.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyPortfolio.Controllers
{
    [Authorize]
    public class FeatureController : Controller
    {
        FirstRepository repo = new FirstRepository();

        [HttpGet]
        public ActionResult Index()
        {
            var values = repo.Listele();
            return View(values);
        }


        [HttpGet]
        public ActionResult Edit(int id)
        {
            var value = repo.Tget(id);
            return View(value);
        }

        [HttpPost]
        public ActionResult Edit(TblFirst p)
        {
            var value = repo.Tget(p.Id);
            value.Title = p.Title;
            value.Subtitle = p.Subtitle;
            value.Subtitle2 = p.Subtitle2;
            value.Description = p.Description;
            value.ImageUrl = p.ImageUrl;
            value.CvUrl = p.CvUrl;
            value.WebsiteTitle = p.WebsiteTitle;
            value.NavTitle = p.NavTitle;
            repo.Tupdate(value);
            return RedirectToAction("Index");
        }
    }
}
