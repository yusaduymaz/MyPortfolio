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
    public class ProjectController : Controller
    {
        ProjectsRepository repo = new ProjectsRepository();

        [HttpGet]
        public ActionResult Index()
        {
            var values = repo.Listele()
        .OrderBy(p => p.SortOrder ?? int.MaxValue)
        .ThenBy(p => p.Id)
        .ToList();
            return View(values);
        }

        [HttpGet]
        public ActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Add(TblProjects p)
        {
            p.IsActive = true; // Default active
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
        public ActionResult Edit(TblProjects p)
        {
            var value = repo.Tget(p.Id);
            value.Title = p.Title;
            value.Description = p.Description;
            value.ImageUrl = p.ImageUrl;
            value.GithubUrl = p.GithubUrl;
            value.DemoUrl = p.DemoUrl;
            value.CreatedDate = p.CreatedDate;
            value.IsActive = p.IsActive;
            value.SortOrder = p.SortOrder;
            value.Situation = p.Situation;
            repo.Tupdate(value);
            return RedirectToAction("Index");
        }
    }
}
