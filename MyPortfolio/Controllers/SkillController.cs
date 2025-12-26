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
    public class SkillController : Controller
    {
        ExpertiseCardsRepository repoCards = new ExpertiseCardsRepository();
        ExpertiseItemsRepository repoItems = new ExpertiseItemsRepository();

        // --- Cards ---
        [HttpGet]
        public ActionResult Index()
        {
            var values = repoCards.Listele();
            return View(values);
        }

        [HttpGet]
        public ActionResult AddCard()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddCard(TblExpertiseCards p)
        {
            repoCards.Tadd(p);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult EditCard(int id)
        {
            var value = repoCards.Tget(id);
            return View(value);
        }

        [HttpPost]
        public ActionResult EditCard(TblExpertiseCards p)
        {
            var value = repoCards.Tget(p.Id);
            value.Title = p.Title;
            value.Subtitle = p.Subtitle;
            value.Tag = p.Tag;
            repoCards.Tupdate(value);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult DeleteCard(int id)
        {
            var value = repoCards.Tget(id);
            repoCards.Tdel(value);
            return RedirectToAction("Index");
        }

        // --- Items ---
        [HttpGet]
        public ActionResult Items(int id)
        {
            var card = repoCards.Tget(id);
            ViewBag.CardTitle = card.Title;
            ViewBag.CardId = id;
            var values = repoItems.Listele().Where(x => x.ExpertiseCardId == id).ToList();
            return View(values);
        }

        [HttpGet]
        public ActionResult AddItem(int cardId)
        {
            ViewBag.CardId = cardId;
            return View();
        }

        [HttpPost]
        public ActionResult AddItem(TblExpertiseItems p)
        {
            repoItems.Tadd(p);
            return RedirectToAction("Items", new { id = p.ExpertiseCardId });
        }

        [HttpGet]
        public ActionResult EditItem(int id)
        {
            var value = repoItems.Tget(id);
            return View(value);
        }

        [HttpPost]
        public ActionResult EditItem(TblExpertiseItems p)
        {
            var value = repoItems.Tget(p.Id);
            value.IconClass = p.IconClass;
            value.Title = p.Title;
            value.Description = p.Description;
            repoItems.Tupdate(value);
            return RedirectToAction("Items", new { id = value.ExpertiseCardId });
        }

        [HttpGet]
        public ActionResult DeleteItem(int id)
        {
            var value = repoItems.Tget(id);
            int cardId = value.ExpertiseCardId;
            repoItems.Tdel(value);
            return RedirectToAction("Items", new { id = cardId });
        }
    }
}
