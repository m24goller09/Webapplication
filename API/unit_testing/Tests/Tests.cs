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
        static ProjectRepository pr = new ProjectRepository(db);
        static ProjectAssignmentRepository par = new ProjectAssignmentRepository(db);
        static UserRepository ur = new UserRepository(db);
        static SubtaskRepository sr = new SubtaskRepository(db);
        static UnitOfWork uow = new UnitOfWork(db);
        static ProjectService ps = new ProjectService(pr, par, uow);
        public static IEnumerable<ITestCase> RepositoryTestCases
        {
            get
            {
                yield return new ProjectAssignmentRepositoryTest(db, par);
                yield return new ProjectRepositoryTest(db, pr);
                //yield return new UserRepositoryTest(db, ur);
                //yield return new SubtaskRepositoryTest(db, sr);
            }
        }

        [SetUp]
        public void Setup()
        {

        }

        [Test, TestCaseSource("RepositoryTestCases")]
        public async Task RepositoryTestCase(ITestCase itc)
        {
            db.Database.EnsureDeleted();
            db = dbContextMocker.GetDbContext("TestDB");
            AssertMessage am = await itc.ExecuteTest();
            Assert.IsTrue(am.resBool, am.GetErrorMessage());
        }

        [TearDown]
        public void Clear()
        {
            
        }
    }
}