using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using AutoMapper;

using API.Services;
using API.Domain.Models;
using API.Domain.Services;
using API.Domain.Repository;
using API.Persistence.Repository;
using API.Persistence.Context;


namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = "https://localhost:5000";
                o.Audience = "resourceapi";
                o.RequireHttpsMetadata = false;
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiReader", policy => policy.RequireClaim("scope", "api.read"));
                options.AddPolicy("Consumer", policy => policy.RequireClaim(ClaimTypes.Role, "consumer"));
                options.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, "admin"));
            });

            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            })
                .SetCompatibilityVersion(CompatibilityVersion.Latest);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v0", new OpenApiInfo { Title = "Backend", Version = "v0" });
            });

            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<dbContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IStandardRepository<User>, UserRepository>();
            services.AddScoped<IStandardService<User>, UserService>();

            services.AddScoped<IStandardRepository<ProjectAssignment>, ProjectAssignmentRepository>();

            services.AddScoped<IStandardRepository<Project>, ProjectRepository>();
            services.AddScoped<IStandardService<Project>, ProjectService>();

            services.AddScoped<IStandardRepository<Subtask>, SubtaskRepository>();
            services.AddScoped<IStandardService<Subtask>, SubTaskService>();

            services.AddScoped<IStandardRepository<SubtaskAssignment>, SubtaskAssignmentRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();

                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v0/swagger.json", "Backend");
                });
            }

            app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthentication();

            app.UseMvc();

        }
    }
}