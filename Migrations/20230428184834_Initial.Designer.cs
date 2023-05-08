﻿// <auto-generated />
using System;
using Cuttlefish.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Cuttlefish.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230428184834_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Cuttlefish.Models.Comments", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<string>("content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("taskID")
                        .HasColumnType("int");

                    b.Property<int>("teamMemberID")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("taskID");

                    b.HasIndex("teamMemberID");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Cuttlefish.Models.Labels", b =>
                {
                    b.Property<string>("label")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("color")
                        .HasMaxLength(7)
                        .HasColumnType("nvarchar(7)");

                    b.HasKey("label");

                    b.ToTable("Labels");
                });

            modelBuilder.Entity("Cuttlefish.Models.LabelsToTasks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("label")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("taskID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("label");

                    b.HasIndex("taskID");

                    b.ToTable("LabelsToTasks");
                });

            modelBuilder.Entity("Cuttlefish.Models.Projects", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<string>("color")
                        .HasMaxLength(7)
                        .HasColumnType("nvarchar(7)");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("dueDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("funds")
                        .HasColumnType("float");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startDate")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Cuttlefish.Models.Sprints", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<string>("endDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("goal")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isBacklog")
                        .HasColumnType("bit");

                    b.Property<bool>("isCompleted")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("projectID")
                        .HasColumnType("int");

                    b.Property<string>("startDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("storyPointsAttempted")
                        .HasColumnType("int");

                    b.Property<int>("storyPointsCompleted")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("projectID");

                    b.ToTable("Sprints");
                });

            modelBuilder.Entity("Cuttlefish.Models.Tasks", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<int?>("assignee")
                        .HasColumnType("int");

                    b.Property<double>("cost")
                        .HasColumnType("float");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("endDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("order")
                        .HasColumnType("int");

                    b.Property<int>("priority")
                        .HasColumnType("int");

                    b.Property<string>("progress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("sprintID")
                        .HasColumnType("int");

                    b.Property<string>("startDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("storyPoints")
                        .HasColumnType("int");

                    b.Property<string>("type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("assignee");

                    b.HasIndex("sprintID");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("Cuttlefish.Models.TasksToTasks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("dependentTaskID")
                        .HasColumnType("int");

                    b.Property<int>("independentTaskID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("dependentTaskID");

                    b.HasIndex("independentTaskID");

                    b.ToTable("TasksToTasks");
                });

            modelBuilder.Entity("Cuttlefish.Models.TeamMembers", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<string>("avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("resetPasswordExpire")
                        .HasColumnType("datetime2");

                    b.Property<string>("resetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("roles")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("TeamMembers");
                });

            modelBuilder.Entity("Cuttlefish.Models.TeamMembersToProjects", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("projectID")
                        .HasColumnType("int");

                    b.Property<int>("teamMemberID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("projectID");

                    b.HasIndex("teamMemberID");

                    b.ToTable("TeamMembersToProjects");
                });

            modelBuilder.Entity("Cuttlefish.Models.Comments", b =>
                {
                    b.HasOne("Cuttlefish.Models.Tasks", "Tasks")
                        .WithMany()
                        .HasForeignKey("taskID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Cuttlefish.Models.TeamMembers", "TeamMembers")
                        .WithMany()
                        .HasForeignKey("teamMemberID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tasks");

                    b.Navigation("TeamMembers");
                });

            modelBuilder.Entity("Cuttlefish.Models.LabelsToTasks", b =>
                {
                    b.HasOne("Cuttlefish.Models.Labels", "Labels")
                        .WithMany()
                        .HasForeignKey("label");

                    b.HasOne("Cuttlefish.Models.Tasks", "Tasks")
                        .WithMany()
                        .HasForeignKey("taskID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Labels");

                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("Cuttlefish.Models.Sprints", b =>
                {
                    b.HasOne("Cuttlefish.Models.Projects", "Projects")
                        .WithMany()
                        .HasForeignKey("projectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Projects");
                });

            modelBuilder.Entity("Cuttlefish.Models.Tasks", b =>
                {
                    b.HasOne("Cuttlefish.Models.TeamMembers", "assigneeTM")
                        .WithMany()
                        .HasForeignKey("assignee");

                    b.HasOne("Cuttlefish.Models.Sprints", "Sprints")
                        .WithMany()
                        .HasForeignKey("sprintID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sprints");

                    b.Navigation("assigneeTM");
                });

            modelBuilder.Entity("Cuttlefish.Models.TasksToTasks", b =>
                {
                    b.HasOne("Cuttlefish.Models.Tasks", "dependentTasks")
                        .WithMany()
                        .HasForeignKey("dependentTaskID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Cuttlefish.Models.Tasks", "independentTasks")
                        .WithMany()
                        .HasForeignKey("independentTaskID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("dependentTasks");

                    b.Navigation("independentTasks");
                });

            modelBuilder.Entity("Cuttlefish.Models.TeamMembersToProjects", b =>
                {
                    b.HasOne("Cuttlefish.Models.Projects", "Projects")
                        .WithMany()
                        .HasForeignKey("projectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Cuttlefish.Models.TeamMembers", "TeamMembers")
                        .WithMany()
                        .HasForeignKey("teamMemberID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Projects");

                    b.Navigation("TeamMembers");
                });
#pragma warning restore 612, 618
        }
    }
}