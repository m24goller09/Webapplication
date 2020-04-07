using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Domain.Models
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
        public virtual DbSet<Subtask> Subtask { get; set; }
        public virtual DbSet<SubtaskAssignment> SubtaskAssignment { get; set; }
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

            modelBuilder.Entity<Subtask>(entity =>
            {
                entity.Property(e => e.SubtaskId)
                    .HasColumnName("subtaskID")
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
                    .WithMany(p => p.Subtask)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<SubtaskAssignment>(entity =>
            {
                entity.HasKey(e => new { e.Username, e.SubtaskId });

                entity.Property(e => e.Username).HasColumnName("username");

                entity.Property(e => e.SubtaskId).HasColumnName("subtaskID");

                entity.HasOne(d => d.Subtask)
                    .WithMany(p => p.SubtaskAssignment)
                    .HasForeignKey(d => d.SubtaskId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.SubtaskAssignment)
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
