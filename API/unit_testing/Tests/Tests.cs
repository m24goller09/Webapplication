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
                yield return new ProjectAssignmentRepositoryTest(ref db, ref par);
                yield return new ProjectRepositoryTest(ref db, ref pr);
                yield return new UserRepositoryTest(ref db, ref ur);
                yield return new SubtaskRepositoryTest(ref db, ref sr);
            }
        }

        [SetUp]
        public void Setup()
        {

        }

        [Test, TestCaseSource("RepositoryTestCases")]
        public async Task RepositoryTestCase(ITestCase itc)
        {
            AssertMessage am = await itc.ExecuteTest();
            Assert.IsTrue(am.resBool, am.GetErrorMessage());
        }

        [TearDown]
        public void Clear()
        {
            
        }
    }
}