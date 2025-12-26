using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyPortfolio.Repositories;

namespace MyPortfolio.Controllers
{
    [Authorize]
    public class MessageController : Controller
    {
        MessagesRepository repo = new MessagesRepository();

        [HttpGet]
        public ActionResult Index()
        {
            var values = repo.Listele();
            return View(values);
        }

        [HttpGet]
        public ActionResult Details(int id)
        {
            var value = repo.Tget(id);
            // Mark as read when viewed
            if (value.IsRead != true)
            {
                value.IsRead = true;
                repo.Tupdate(value);
            }
            return View(value);
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            var value = repo.Tget(id);
            repo.Tdel(value);
            return RedirectToAction("Index");
        }
    }
}
