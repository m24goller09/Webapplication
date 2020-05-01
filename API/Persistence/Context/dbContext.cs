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
        public virtual DbSet<ProjectState> ProjectState { get; set; }
        public virtual DbSet<Subtask> Subtask { get; set; }
        public virtual DbSet<SubtaskState> SubtaskState { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Data Source=database/db.sqlite");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.ProjectId)
                    .HasColumnName("projectID")
                    .ValueGeneratedOnAdd();

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

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("state")
                    .HasDefaultValueSql("'running'");

                entity.HasOne(d => d.StateNavigation)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.State)
                    .OnDelete(DeleteBehavior.ClientSetNull);

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

            modelBuilder.Entity<ProjectState>(entity =>
            {
                entity.HasKey(e => e.State);

                entity.Property(e => e.State).HasColumnName("state");
            });

            modelBuilder.Entity<Subtask>(entity =>
            {
                entity.Property(e => e.SubtaskId)
                    .HasColumnName("subtaskID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Assigned).HasColumnName("assigned");

                entity.Property(e => e.Creator)
                    .IsRequired()
                    .HasColumnName("creator");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.ProjectId).HasColumnName("projectID");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("state")
                    .HasDefaultValueSql("'running'");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Subtask)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.StateNavigation)
                    .WithMany(p => p.Subtask)
                    .HasForeignKey(d => d.State)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.ProjectAssignment)
                    .WithMany(p => p.SubtaskProjectAssignment)
                    .HasForeignKey(d => new { d.Assigned, d.ProjectId });

                entity.HasOne(d => d.ProjectAssignmentNavigation)
                    .WithMany(p => p.SubtaskProjectAssignmentNavigation)
                    .HasForeignKey(d => new { d.Creator, d.ProjectId })
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<SubtaskState>(entity =>
            {
                entity.HasKey(e => e.State);

                entity.Property(e => e.State).HasColumnName("state");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username);

                entity.Property(e => e.Username).HasColumnName("username");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasDefaultValueSql("''");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
