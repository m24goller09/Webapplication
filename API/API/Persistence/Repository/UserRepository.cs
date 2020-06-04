﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Persistence.Context;
using API.Domain.Repository;
using API.Domain.Models;

namespace API.Persistence.Repository
{
    public class UserRepository : IStandardRepository<User>
    {
        private readonly dbContext dbContext;

        public UserRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddAsync(User user)
        {
            await dbContext.User.AddAsync(user);
        }

        public async Task<User> FindByIdAsync(dynamic id)
        {
            // Check if user is found will be made in the service class.
            return await dbContext.User.FindAsync(id);
        }

        public async Task<IEnumerable<User>> ListAsync()
        {
            return await dbContext.User
                .Include(d => d.ProjectAssignment).ThenInclude(d => d.Project).ThenInclude(d => d.Subtask) // Multiple JOINS
                .ToListAsync();
        }

        public void Remove(User user)
        {
            dbContext.User.Remove(user);
        }
    }
}