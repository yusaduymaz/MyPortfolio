using MyPortfolio.Models.Entity;
using MyPortfolio.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyPortfolio.Controllers
{
    [AllowAnonymous]
    public class DefaultController : Controller
    {
        MyPortfolioDBEntities db = new MyPortfolioDBEntities();
        // GET: Default
        public ActionResult Index()
        {
            var values = db.TblFirst.ToList();
            return View(values);
        }
        public PartialViewResult About()
        {
           var values = db.TblAbouts.ToList();
           return PartialView(values);
        }
        public PartialViewResult AboutCards()
        {
            var values = db.TblAboutsCards.ToList();
            return PartialView(values);
        }
        public PartialViewResult Expertise()
        {
            var values = db.TblExpertiseCards.ToList();
            return PartialView(values);
        }
        public PartialViewResult ExpertiseItems(int cardId)
        {
            var values = db.TblExpertiseItems.Where(i => i.ExpertiseCardId == cardId).ToList();
            return PartialView(values);
        }

        public PartialViewResult Certificates()
        {
            var values = db.TblCertificates.ToList();
            return PartialView(values);
        }
        private readonly ProjectsRepository repo = new ProjectsRepository();
        public PartialViewResult Projects()
        {
            var activeProjects = repo.Listele()
                .Where(p => p.IsActive)
                .OrderBy(p => p.SortOrder ?? int.MaxValue)
                .ThenBy(p => p.Id)
                .ToList();
            return PartialView(activeProjects);
        }
        public PartialViewResult ProjectsTechnologies(int projectId)
        {
            var values = db.TblProjectTechnologies.Where(t => t.ProjectId == projectId).ToList();
            return PartialView(values);
        }
        [HttpGet]
        public PartialViewResult Contact()
        {
            return PartialView(new TblMessages());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Contact(TblMessages model)
        {
            // DB First entity'de annotation yoksa elle kontrol
            if (string.IsNullOrWhiteSpace(model.FullName))
                ModelState.AddModelError("FullName", "Ad Soyad zorunlu.");
            if (string.IsNullOrWhiteSpace(model.Email))
                ModelState.AddModelError("Email", "E-posta zorunlu.");
            if (string.IsNullOrWhiteSpace(model.Subject))
                ModelState.AddModelError("Subject", "Konu zorunlu.");
            if (string.IsNullOrWhiteSpace(model.Content))
                ModelState.AddModelError("Content", "Mesaj zorunlu.");

            if (!ModelState.IsValid)
            {
                // Normal submitte partial döndürmek sayfayı partial’a düşürür.
                // Bu yüzden Index view'ı içinde contact partial'ı tekrar basmak gerekir.
                // En pratik: Index'e TempData ile hataları taşımak (ileri seviye).
                // Basit yaklaşım: Index view'ını döndürmek için Index action'ını çağır (aşağıdaki C seçeneğine bak).
                return View("Index"); // eğer Index view'ın bu controller'da ise
            }

            // overposting'e karşı yeni entity
            var entity = new TblMessages
            {
                FullName = model.FullName,
                Email = model.Email,
                Subject = model.Subject,
                Content = model.Content,
                SentDate = DateTime.Now,
                IsRead = false
            };

            db.TblMessages.Add(entity);
            db.SaveChanges();

            TempData["ContactSuccess"] = "Mesajınız gönderildi. Teşekkürler!";
            return RedirectToAction("Index"); // form refresh + çift post engeli
        }
        public PartialViewResult SocialMedia()
        {
            var values = db.TblSocialMedia.Where(s => s.IsActive == true).ToList();
            return PartialView(values);
        }
        public PartialViewResult Information()
        {
            var values = db.TblInformation.ToList();
            return PartialView(values);
        }
    }
}