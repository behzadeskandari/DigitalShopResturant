﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalShopResturant.Models.ViewModels
{
  public class SubCategoryAndCategoryViewModel
  {

    public IEnumerable<Category> CategoriesList { get; set; }

    public SubCategory SubCategory { get; set; }

    public List<string> SubCategoryList { get; set; }

    public string StatusMessage { get; set; }

  }
}
