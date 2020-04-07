using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using API.Domain.Models;

namespace API.Persistence.Context
{ 
    public partial class dbContext : DbContext
    {
        public dbContext()
        {
        }

        public dbContext(DbContextOptions<dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectAssignment> ProjectAssignment { get; set; }
        public virtual DbSet<Task> Task { get; set; }
        public virtual DbSet<TaskAssignment> TaskAssignment { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlite("Data Source=database/db.sqlite");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.ProjectId)
                    .HasColumnName("projectID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Manager)
                    .IsRequired()
                    .HasColumnName("manager");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.HasOne(d => d.ProjectAssignment)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => new { d.Manager, d.ProjectId })
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ProjectAssignment>(entity =>
            {
                entity.HasKey(e => new { e.Username, e.ProjectId });

                entity.Property(e => e.Username).HasColumnName("username");

                entity.Property(e => e.ProjectId).HasColumnName("projectID");

                entity.HasOne(d => d.ProjectNavigation)
                    .WithMany(p => p.ProjectAssignmentNavigation)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.ProjectAssignment)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.Property(e => e.TaskId)
                    .HasColumnName("taskID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.ProjectId).HasColumnName("projectID");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Task)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<TaskAssignment>(entity =>
            {
                entity.HasKey(e => new { e.Username, e.TaskId });

                entity.Property(e => e.Username).HasColumnName("username");

                entity.Property(e => e.TaskId).HasColumnName("taskID");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TaskAssignment)
                    .HasForeignKey(d => d.TaskId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.TaskAssignment)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username);

                entity.Property(e => e.Username).HasColumnName("username");

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasColumnName("firstname")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.IsAdmin)
                    .IsRequired()
                    .HasColumnName("isAdmin")
                    .HasColumnType("boolean")
                    .HasDefaultValueSql("0/* note: there are no booleans in sqlite, maybe add a check constraint */");

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasColumnName("lastname")
                    .HasDefaultValueSql("''");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
