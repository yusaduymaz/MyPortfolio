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
    public class CertificateController : Controller
    {
        CertificatesRepository repo = new CertificatesRepository();

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
        public ActionResult Add(TblCertificates p)
        {
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
        public ActionResult Edit(TblCertificates p)
        {
            var value = repo.Tget(p.Id);
            value.Title = p.Title;
            value.Institution = p.Institution;
            value.Date = p.Date;
            value.CertificateLink = p.CertificateLink;
            value.Icon = p.Icon;
            repo.Tupdate(value);
            return RedirectToAction("Index");
        }
    }
}
