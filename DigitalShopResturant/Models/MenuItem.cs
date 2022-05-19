using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalShopResturant.Models
{
  public class MenuItem
  {
    public int Id { get; set; }

    [Required]
    [Display(Name = "نام ")]

    public string Name { get; set; }

    [Display(Name = "توضیحات")]

    public string Description { get; set; }
    [Display(Name = "تندی غذا")]

    public string Spicyness { get; set; }
    public enum ESpicy { NA = 0, NotSpicy = 1, Spicy = 2, VerySpicy = 3 }

    [Display(Name = "عکس")]

    public string Image { get; set; }

    [Display(Name = "مجموعه")]
    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public virtual Category Category { get; set; }

    [Display(Name = "زیر مجموعه")]
    public int SubCategoryId { get; set; }

    [ForeignKey("SubCategoryId")]
    public virtual SubCategory SubCategory { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "  ${1}    قیمت  باید بیشتر از باشد")]
    [Display(Name = "قیمت")]

    public double Price { get; set; }


  }
}
