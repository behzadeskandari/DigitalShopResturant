using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalShopResturant.Models
{
  public class ApplicationUser : IdentityUser
  {
    [Display(Name = "نام")]
    public string Name { get; set; }

    [Display(Name = "ادرس")]

    public string StreetAddress { get; set; }
    [Display(Name = "شهر")]

    public string City { get; set; }
    [Display(Name = "استان")]

    public string State { get; set; }
    [Display(Name = "کد پستی")]
    public string PostalCode { get; set; }

  }
}
