using MyPortfolio.Models.Entity;
using MyPortfolio.Repositories;
using MyPortfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyPortfolio.Controllers
{
    [Authorize]
    public class AboutController : Controller
    {
        AboutsRepository repoAbout = new AboutsRepository();
        AboutsCardsRepository repoCards = new AboutsCardsRepository();

        [HttpGet]
        public ActionResult Index()
        {
            var model = new AboutViewModel
            {
                About = repoAbout.Listele().FirstOrDefault(),
                AboutCards = repoCards.Listele()
            };
            return View(model);
        }

        [HttpPost]
        public ActionResult UpdateAbout(TblAbouts p)
        {
            var value = repoAbout.Tget(p.Id);
            value.Title = p.Title;
            value.SubTitle = p.SubTitle;
            value.Description = p.Description;
            value.Description2 = p.Description2;
            repoAbout.Tupdate(value);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult AddCard(TblAboutsCards p)
        {
            repoCards.Tadd(p);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult DeleteCard(int id)
        {
            var value = repoCards.Tget(id);
            repoCards.Tdel(value);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult EditCard(int id)
        {
            var value = repoCards.Tget(id);
            return View(value);
        }

        [HttpPost]
        public ActionResult EditCard(TblAboutsCards p)
        {
            var value = repoCards.Tget(p.Id);
            value.CardIcon = p.CardIcon;
            value.CardBaslik = p.CardBaslik;
            value.CardAltBaslik = p.CardAltBaslik;
            value.CardAltBaslik2 = p.CardAltBaslik2;
            repoCards.Tupdate(value);
            return RedirectToAction("Index");
        }
    }
}
