using System;
using System.Collections.Generic;
using System.Text;
using DigitalShopResturant.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DigitalShopResturant.Data
{
  public class ApplicationDbContext : IdentityDbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }


    public DbSet<Category> Categories { get; set; }

    public DbSet<SubCategory> subCategories { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<OrderDetails> OrderDetails { get; set; }
    public DbSet<OrderHeader> OrderHeaders { get; set; }
    public DbSet<ShoppingCart> ShoppingCarts { get; set; }
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }

  }
}
