using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyPortfolio.Models.Entity;

namespace MyPortfolio.Controllers
{
    [Authorize]
    public class InformationController : Controller
    {
        // DbContext sınıfın adını kendi projenle aynı yap:
        // Ornek: MyPortfolioEntities, DbMyPortfolioEntities vs.
        MyPortfolioDBEntities db = new MyPortfolioDBEntities();

        // GET: /Information
        public ActionResult Index()
        {
            var values = db.TblInformation.ToList();
            return View(values);
        }

        // GET: /Information/Add
        [HttpGet]
        public ActionResult Add()
        {
            return View();
        }

        // POST: /Information/Add
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Add(TblInformation p)
        {
            if (!ModelState.IsValid)
                return View(p);

            db.TblInformation.Add(p);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: /Information/Edit/5
        [HttpGet]
        public ActionResult Edit(byte id)
        {
            var value = db.TblInformation.Find(id);
            if (value == null)
                return HttpNotFound();

            return View(value);
        }

        // POST: /Information/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(TblInformation p)
        {
            if (!ModelState.IsValid)
                return View(p);

            var value = db.TblInformation.Find(p.Id);
            if (value == null)
                return HttpNotFound();

            value.Icon = p.Icon;
            value.Title = p.Title;
            value.Subtitle = p.Subtitle;
            value.Button = p.Button;

            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: /Information/Delete/5
        public ActionResult Delete(byte id)
        {
            var value = db.TblInformation.Find(id);
            if (value == null)
                return HttpNotFound();

            db.TblInformation.Remove(value);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}