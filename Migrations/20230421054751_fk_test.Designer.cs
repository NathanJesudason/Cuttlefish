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
    [Migration("20230421054751_fk_test")]
    partial class fk_test
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

                    b.Property<int>("projectID")
                        .HasColumnType("int");

                    b.Property<int>("taskID")
                        .HasColumnType("int");

                    b.Property<int>("teamMemberID")
                        .HasColumnType("int");

                    b.HasKey("id");

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
                        .HasColumnType("nvarchar(max)")
                        .HasColumnOrder(1);

                    b.Property<int>("taskID")
                        .HasColumnType("int")
                        .HasColumnOrder(2);

                    b.HasKey("Id");

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

                    b.Property<int>("ProjectsID")
                        .HasColumnType("int");

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

                    b.Property<string>("startDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("storyPointsAttempted")
                        .HasColumnType("int");

                    b.Property<int>("storyPointsCompleted")
                        .HasColumnType("int");

                    b.HasKey("id");

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

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("Cuttlefish.Models.TasksToTasks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("dependentTaskID")
                        .HasColumnType("int")
                        .HasColumnOrder(2);

                    b.Property<int>("independentTaskID")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.HasKey("Id");

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
                        .HasColumnType("int")
                        .HasColumnOrder(2);

                    b.Property<int>("teamMemberID")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.HasKey("Id");

                    b.ToTable("TeamMembersToProjects");
                });
#pragma warning restore 612, 618
        }
    }
}
