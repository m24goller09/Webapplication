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
    public class ProjectAssignmentRepositoryTest : ITestCase
    {
        private dbContext db = null;
        private ProjectAssignmentRepository par = null;
        public ProjectAssignmentRepositoryTest(dbContext db, ProjectAssignmentRepository par)
        {
            this.db = db;
            this.par = par;
        }

        public async Task<AssertMessage> ExecuteTest()
        {
            AssertMessage am = new AssertMessage("In ProjectAssignmentRepositoryTest:");

            if((db == null) || (par == null))
            {
                am.AddErrorMessage("Database or ProjectAssignmentRepository is null!");
                return am;
            }

            var pas = await par.ListAsync();

            foreach(ProjectAssignment projAs in pas)
            {
                am.resBool = true;
            }

            if(!am.resBool)
            {
                am.AddErrorMessage("ProjectAssignmentRepository is empty, but should include at least one ProjectAssignment!");
            }
            
            foreach(ProjectAssignment projAs in pas)
            {
                if((projAs.Username == "Mario1") && (projAs.ProjectId == 1))
                {
                    par.Remove(projAs);
                    db.SaveChanges();
                }
                else
                {
                    am.resBool = false;
                    am.AddErrorMessage("The searched ProjectAssignment could not be found!");
                }
            }

            pas = await par.ListAsync();

            foreach(ProjectAssignment projAs in pas)
            {
                am.resBool = false;
                am.AddErrorMessage("ProjectAssignment found, but should be empty!");
            }

            try
            {
                await par.AddAsync(new ProjectAssignment
                {
                    Username = "Mario1",
                    ProjectId = 1
                });
                db.SaveChanges();
            }
            catch(Exception e)
            {
                am.resBool = false;
                am.AddErrorMessage("Add ProjectAssignment did not work!\nException: " + e.Source + " Message: " + e);
            }

            pas = await par.ListAsyncByUser("Mario1");

            foreach(ProjectAssignment projAs in pas)
            {
                if(projAs.Username != "Mario1")
                {
                    am.resBool = false;
                    am.AddErrorMessage("The searched ProjectAssignment could not be found! Searched with User.");
                }
            }

            pas = await par.ListAsyncByProject(1);

            foreach(ProjectAssignment projAs in pas)
            {
                if(projAs.ProjectId != 1)
                {
                    am.resBool = false;
                    am.AddErrorMessage("The searched ProjectAssignment could not be found! Searched with ProjectId.");
                }
            }

            return am;
        }
    }
}