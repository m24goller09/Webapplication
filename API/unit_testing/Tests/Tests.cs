using NUnit.Framework;
using unit_testing.helper;

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using API.Domain.Models;
using API.Domain.Services;
using API.Persistence.Context;
using API.Services;
using API.Persistence.Repository;
using System.Threading.Tasks;

namespace unit_testing.Tests
{
    [TestFixture]
    public class Tests
    {
        static dbContext db = dbContextMocker.GetDbContext("TestDB");
        static ProjectRepository pr;
        static ProjectAssignmentRepository par;
        static UserRepository ur;
        static SubtaskRepository sr;
        static UnitOfWork uow;
        static ProjectService ps{ get; set; }

        [SetUp]
        public void Setup()
        {
            pr = new ProjectRepository(db);
            par = new ProjectAssignmentRepository(db);
            ur = new UserRepository(db);
            sr = new SubtaskRepository(db);
            uow = new UnitOfWork(db);
            ps = new ProjectService(pr, par, uow);
        }

        [Test]
        public async Task ProjectAssignmentRepositoryTest()
        {
            ProjectAssignment pa = new ProjectAssignment();
            pa.Username = "Mario1";
            pa.ProjectId = 1234;
            await par.AddAsync(pa);
            ProjectAssignment pa2 = await par.FindByIdAsync(1234);

            bool res = pa2 != null;
            Assert.IsTrue(res, "ProjectAssignment is not in database!");
        }

        [TearDown]
        public void Clear()
        {
            
        }
    }
}