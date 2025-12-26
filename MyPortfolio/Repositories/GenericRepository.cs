using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using MyPortfolio.Models.Entity;

namespace MyPortfolio.Repositories
{
    public class GenericRepository<T> where T:class,new()
    {
        MyPortfolioDBEntities db = new MyPortfolioDBEntities();

        public List<T> Listele()
        {
            return db.Set<T>().ToList();
        }
        public void Tadd(T p)
        {
            db.Set<T>().Add(p);
            db.SaveChanges();
        }
        public void Tdel(T p) {
            db.Set<T>().Remove(p);
            db.SaveChanges();
        }
        
        public T Tget(int id)
        {
            return db.Set<T>().Find(id);
        }
        public void Tupdate(T p)
        {
            db.SaveChanges();
        }

        public T Find(Expression<Func<T,bool>> where)
        {
            return db.Set<T>().FirstOrDefault(where);
        }

    }
}