using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalShopResturant.Models
{
  public class PagingInfo
  {
    [Display(Name = "مقدار کل")]

    public int TotalItem { get; set; }
    [Display(Name = "تعداد در صفحه")]

    public int ItemsPerPage { get; set; }
    [Display(Name = "صفحه فعلی")]

    public int CurrentPage { get; set; }
    [Display(Name = "کل صفحات")]

    public int totalPage => (int)Math.Ceiling((decimal)TotalItem / ItemsPerPage);

    public string urlParam { get; set; }
  }
}
