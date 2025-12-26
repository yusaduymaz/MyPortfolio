using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyPortfolio.Models.Entity;
using MyPortfolio.Repositories;

namespace MyPortfolio.Controllers
{
    [Authorize]
    public class SocialMediaController : Controller
    {
        SocialMediaRepository repo = new SocialMediaRepository();

        [HttpGet]
        public ActionResult Index()
        {
            var values = repo.Listele();
            return View(values);
        }

        [HttpGet]
        public ActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Add(TblSocialMedia p)
        {
            p.IsActive = true;
            repo.Tadd(p);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            var value = repo.Tget(id);
            repo.Tdel(value);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var value = repo.Tget(id);
            return View(value);
        }

        [HttpPost]
        public ActionResult Edit(TblSocialMedia p)
        {
            var value = repo.Tget(p.SocialMediaID);
            value.Name = p.Name;
            value.Url = p.Url;
            value.Icon = p.Icon;
            value.IsActive = p.IsActive;
            repo.Tupdate(value);
            return RedirectToAction("Index");
        }
    }
}
