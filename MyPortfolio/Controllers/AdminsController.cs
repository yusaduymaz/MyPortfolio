using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using MyPortfolio.Models.Entity;

namespace MyPortfolio.Controllers
{
    public class AdminsController : Controller
    {
        MyPortfolioDBEntities db = new MyPortfolioDBEntities(); // context adını düzelt

        // GET: /Admins
        public ActionResult Index()
        {
            var values = db.TblAdmins.ToList();
            return View(values);
        }

        // GET: /Admins/Add
        [HttpGet]
        public ActionResult Add()
        {
            return View();
        }

        // POST: /Admins/Add
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Add(TblAdmins p)
        {
            if (!ModelState.IsValid)
                return View(p);

            db.TblAdmins.Add(p);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: /Admins/Edit/5
        [HttpGet]
        public ActionResult Edit(int id)
        {
            var value = db.TblAdmins.Find(id);
            if (value == null)
                return HttpNotFound();

            return View(value);
        }

        // POST: /Admins/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(TblAdmins p)
        {
            if (!ModelState.IsValid)
                return View(p);

            var value = db.TblAdmins.Find(p.Id);
            if (value == null)
                return HttpNotFound();

            value.Email = p.Email;
            value.Password = p.Password;

            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: /Admins/Delete/5
        public ActionResult Delete(int id)
        {
            var value = db.TblAdmins.Find(id);
            if (value == null)
                return HttpNotFound();

            db.TblAdmins.Remove(value);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}