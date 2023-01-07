using Microsoft.EntityFrameworkCore;
using MuseumApp.Core.Interfaces;
using MuseumApp.Infrastructure.DataContexts;
using MuseumApp.Services.ServiceInterfaces;
using MuseumApp.Services.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder => {
                builder.WithOrigins("http://localhost:4200").AllowCredentials()
                                                            .AllowAnyMethod()
                                                            .AllowAnyHeader();
            }));

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUnitOfWork, ApplicationDbContext>();
builder.Services.AddScoped<IMuseumService, MuseumService>();
builder.Services.AddScoped<IArticleService, ArticleService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("ApiCorsPolicy");

app.MapControllers();

app.Run();
