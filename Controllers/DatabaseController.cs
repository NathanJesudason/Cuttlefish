using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Cuttlefish.Data;
using Cuttlefish.Models;

namespace Cuttlefish.Controllers;

[ApiController]
[Route("[api]")]
public class DatabaseController : ControllerBase
{

    private readonly ApplicationDbContext _context;

    public DatabaseController(ApplicationDbContext context)
    {
        _context = context;
    }

}
