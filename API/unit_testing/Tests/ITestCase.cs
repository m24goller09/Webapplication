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
    public interface ITestCase
    {
        Task<AssertMessage> ExecuteTest();
    }
}