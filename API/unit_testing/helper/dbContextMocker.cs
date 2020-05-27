using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

using API.Persistence.Context;
using API.Domain.Models;

namespace unit_testing.helper
{
    public static class dbContextMocker
    {
        public static dbContext GetDbContext(string name)
        {
            var options = new DbContextOptionsBuilder<dbContext>().UseInMemoryDatabase(databaseName: name).ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning)).Options;

            var db = new dbContext(options);

            Seed(db);

            return db;
        }

        public static void Seed(dbContext db)
        {
            db.User.Add(new User
            {
                Username = "Chris1",
                Name = "Christoph"
            });

            db.User.Add(new User
            {
                Username = "Nils1",
                Name = "Nils"
            });

            db.User.Add(new User
            {
                Username = "Mario1",
                Name = "Mario"
            });
            
            db.Project.Add(new Project
            {
                ProjectId = 1,
                Name = "Chirs1",
                Description = "testing",
                Manager = "Nils1",
                State = "running"
            });

            db.ProjectAssignment.Add(new ProjectAssignment
            {
                Username = "Nils1",
                ProjectId = 2
            });

            db.ProjectState.Add(new ProjectState
            {
                State = "running"
            });

            db.Subtask.Add(new Subtask
            {
                SubtaskId = 12,
                Name = "Chris1",
                Description = "testing",
                ProjectId = 13,
                State = "finished",
                Creator = "Nils1",
                Assigned = "Mario1"
            });

            //db.SubtaskAssignment.Add(new SubtaskAssignment
            //{
            //    Username = "Mario1",
            //    SubtaskId = 12
            //});

            db.SubtaskState.Add(new SubtaskState
            {
                State = "running"
            });

            db.SaveChanges();
        }
    }
}