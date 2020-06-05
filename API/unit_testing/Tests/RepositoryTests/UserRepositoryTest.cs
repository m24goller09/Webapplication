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
    public class UserRepositoryTest : ITestCase
    {
        private dbContext db = null;
        private UserRepository ur = null;
        public UserRepositoryTest(dbContext db, UserRepository ur)
        {
            this.db = db;
            this.ur = ur;
        }

        public async Task<AssertMessage> ExecuteTest()
        {
            AssertMessage am = new AssertMessage("In UserRepositoryTest:");

            if((db == null) || (ur == null))
            {
                am.AddErrorMessage("Database or UserRepository is null!");
                return am;
            }

            var us = await ur.ListAsync();

            foreach(User u in us)
            {
                am.resBool = true;
            }

            if(!am.resBool)
            {
                am.AddErrorMessage("UserRepository is empty, but should include at least one Project!");
            }

            foreach(User u in us)
            {
                if(u.Username == "Chris1"){}
                else if(u.Username == "Mario1"){}
                else if(u.Username == "Nils1"){}
                else if(u.Username == "Jonas1")
                {
                    ur.Remove(u);
                    db.SaveChanges();
                }
                else
                {
                    am.resBool = false;
                    am.AddErrorMessage("The searched User could not be found!");
                }
            }

            us = await ur.ListAsync();

            foreach(User u in us)
            {
                if(u.Username == "Jonas1")
                {
                    am.resBool = false;
                    am.AddErrorMessage("User should be deleted!");
                }
            }

            try
            {
                await ur.AddAsync(new User
                {
                    Username = "Jonas1",
                    Name = "Jonas"
                });
                db.SaveChanges();
            }
            catch(Exception e)
            {
                am.resBool = false;
                am.AddErrorMessage("Add User did not work!\nException: " + e.Source + " Message: " + e);
            }

            us = await ur.ListAsync();

            bool bTmp = false;

            foreach(User u in us)
            {
                if(u.Username == "Jonas1")
                {
                    bTmp = true;
                }
            }

            if(!bTmp)
            {
                am.resBool = false;
                am.AddErrorMessage("The searched User could not be found!");
            }

            return am;
        }
    }
}