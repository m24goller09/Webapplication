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
    public class SubtaskRepositoryTest : ITestCase
    {
        private dbContext db = null;
        private SubtaskRepository sr = null;
        public SubtaskRepositoryTest(ref dbContext db, ref SubtaskRepository sr)
        {
            this.db = db;
            this.sr = sr;
        }

        public async Task<AssertMessage> ExecuteTest()
        {
            AssertMessage am = new AssertMessage("In SubtaskRepositoryTest:");

            if((db == null) || (sr == null))
            {
                am.AddErrorMessage("Database or SubtaskRepository is null!");
                return am;
            }

            var ss = await sr.ListAsync();

            foreach(Subtask s in ss)
            {
                am.resBool = true;
            }

            if(!am.resBool)
            {
                am.AddErrorMessage("SubtaskRepository is empty, but should include at least one Subtask!");
            }

            foreach(Subtask s in ss)
            {
                if((s.SubtaskId == 12) && (s.ProjectId == 1))
                {
                    sr.Remove(s);
                    db.SaveChanges();
                }
                else
                {
                    am.resBool = false;
                    am.AddErrorMessage("The searched Subtask could not be found!");
                }
            }

            ss = await sr.ListAsync();

            foreach(Subtask s in ss)
            {
                am.resBool = false;
                am.AddErrorMessage("Subtask should be empty!");
            }

            try
            {
                await sr.AddAsync(new Subtask
                {
                    SubtaskId = 12,
                    Name = "test subtask",
                    Description = "testing",
                    ProjectId = 1,
                    State = "running",
                    Creator = "Nils1",
                    Assigned = "Mario1"
                });
                db.SaveChanges();
            }
            catch(Exception e)
            {
                am.resBool = false;
                am.AddErrorMessage("Add Subtask did not work!\nException: " + e.Source + " Message: " + e);
            }

            ss = await sr.ListAsync();

            bool bTmp = false;

            foreach(Subtask s in ss)
            {
                bTmp = true;
            }

            if(!bTmp)
            {
                am.resBool = false;
                am.AddErrorMessage("SubtaskRepository is empty, but should include one Subtask!");
            }

            return am;
        }
    }
}