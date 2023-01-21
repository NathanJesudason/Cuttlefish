using Cuttlefish.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();

var dbConnectionString = builder.Configuration.GetConnectionString("DBConnectionString");

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(dbConnectionString));
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(options => options.WithOrigins("http://localhost:44430").AllowAnyMethod().AllowAnyHeader());


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
