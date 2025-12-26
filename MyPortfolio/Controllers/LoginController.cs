using MyPortfolio.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;


namespace MyPortfolio.Controllers
{
    [AllowAnonymous]
    public class LoginController : Controller
    {
        MyPortfolioDBEntities db = new MyPortfolioDBEntities(); // context adını düzelt

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string email, string password)
        {
            var admin = db.TblAdmins
                          .FirstOrDefault(x => x.Email == email && x.Password == password);

            if (admin != null)
            {
                // Kimliği Forms Auth ile set et
                FormsAuthentication.SetAuthCookie(admin.Email, false);

                // Admin paneline yönlendir (örnek: Dashboard / SocialMedia / vs.)
                return RedirectToAction("Index", "SocialMedia");
            }

            ViewBag.Error = "Kullanıcı adı veya şifre hatalı.";
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Login");
        }
    }
}