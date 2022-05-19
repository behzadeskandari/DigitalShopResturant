using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalShopResturant.Service
{
  public interface IEmailSender
  {
    Task SendEmailAsync(string email, string subject, string message);
    Task Execute(string sendGridKey, string subject, string message, string email);
  }
}
