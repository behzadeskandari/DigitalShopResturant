using DigitalShopResturant.Models;
using DigitalShopResturant.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalShopResturant.Data
{
  public class DbInitializer : IDbInitializer
  {
    private readonly ApplicationDbContext _db;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public DbInitializer(ApplicationDbContext db, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
      _db = db;
      _roleManager = roleManager;
      _userManager = userManager;
    }


    public async void Initialize()
    {
      try
      {
        if (_db.Database.GetPendingMigrations().Count() > 0)
        {
          _db.Database.Migrate();
        }
      }
      catch (Exception ex)
      {

      }

      if (_db.Roles.Any(r => r.Name == SD.ManagerUser)) return;

      _roleManager.CreateAsync(new IdentityRole(SD.ManagerUser)).GetAwaiter().GetResult();
      _roleManager.CreateAsync(new IdentityRole(SD.FrontDeskUser)).GetAwaiter().GetResult();
      _roleManager.CreateAsync(new IdentityRole(SD.KitchenUser)).GetAwaiter().GetResult();
      _roleManager.CreateAsync(new IdentityRole(SD.CustomerEndUser)).GetAwaiter().GetResult();

      _userManager.CreateAsync(new ApplicationUser
      {
        UserName = "behzad.b.i.g@gmail.com",
        Email = "behzad.b.i.g@gmail.com",
        Name = "behzad eskandari",
        EmailConfirmed = true,
        PhoneNumber = "09125274263"
      }, "Admin123*").GetAwaiter().GetResult();

      IdentityUser user = await _db.Users.FirstOrDefaultAsync(u => u.Email == "behzad.b.i.g@gmail.com");

      await _userManager.AddToRoleAsync(user, SD.ManagerUser);

    }

  }

}
