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
    public class ProjectRepositoryTest : ITestCase
    {
        private dbContext db = null;
        private ProjectRepository pr = null;
        public ProjectRepositoryTest(ref dbContext db, ref ProjectRepository pr)
        {
            this.db = db;
            this.pr = pr;
        }

        public async Task<AssertMessage> ExecuteTest()
        {
            AssertMessage am = new AssertMessage("In ProjectRepositoryTest:");

            if((db == null) || (pr == null))
            {
                am.AddErrorMessage("Database or ProjectRepository is null!");
                return am;
            }
            
            var ps = await pr.ListAsync();

            foreach(Project p in ps)
            {
                am.resBool = true;
            }

            if(!am.resBool)
            {
                am.AddErrorMessage("ProjectRepository is empty, but should include at least one Project!");
            }

            foreach(Project p in ps)
            {
                if(p.ProjectId == 1)
                {
                    pr.Remove(p);
                    db.SaveChanges();
                }
                else
                {
                    am.resBool = false;
                    am.AddErrorMessage("The searched Project could not be found!");
                }
            }

            ps = await pr.ListAsync();

            foreach(Project p in ps)
            {
                am.resBool = false;
                am.AddErrorMessage("Project found, but should be empty!");
            }

            try
            {
                await pr.AddAsync(new Project
                {
                    ProjectId = 1,
                    Name = "test projekt",
                    Description = "testing",
                    Manager = "Nils1",
                    State = "running"
                });
                db.SaveChanges();
            }
            catch(Exception e)
            {
                am.resBool = false;
                am.AddErrorMessage("Add Project did not work!\nException: " + e.Source + " Message: " + e);
            }

            ps = await pr.ListAsync();

            bool bTmp = false;

            foreach(Project p in ps)
            {
                bTmp = true;
            }

            if(!bTmp)
            {
                am.resBool = false;
                am.AddErrorMessage("ProjectRepository is empty, but should include one Project!");
            }

            return am;
        }
    }
}