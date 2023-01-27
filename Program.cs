using Cuttlefish.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();

var dbConnectionString = builder.Configuration.GetConnectionString("DBConnectionString");

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(dbConnectionString));
builder.Services.AddCors();
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.UseCors(options => options.WithOrigins("http://localhost:44430").AllowAnyMethod().AllowAnyHeader());
//app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); //possibly allow any origin


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // for verifiying http requests without frontend
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
