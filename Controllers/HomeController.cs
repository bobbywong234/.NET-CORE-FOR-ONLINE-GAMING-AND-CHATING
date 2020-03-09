using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Constore_Core.Models;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Primitives;
using System.Text;
using System.Web;


namespace Constore_Core.Controllers
{
    public class Chatbox : Hub
    {
        public async Task Message_async_sender(string username, string message,string icon) {
            
            await Clients.Others.SendAsync("ReceiveMessage", username, message,icon);
        }
    }
    public class HomeController : Controller
    {
            //for gaming view tasks
        public async Task<List<string>> Supplies_method_1()
        {
             var dices = await Task.FromResult(new Random());
             var section_number = await Task.FromResult(dices.Next(0, 12));
             var output = await Task.FromResult(new List<string>());
            
            for(int i = 1; i < 13;i++)
            {
                //supplies_item_name
                output.Add(BackEndParameters.supplyitem[section_number + i]); 
            }
            for (int i = 1; i < 13; i++) 
            {
                //supplies_item_prices
                output.Add((BackEndParameters.supplybasicprice[section_number + i] + dices.Next(3, 8)).ToString()); 
            }
            return output;

        }

        public async Task<List<int>> Supplies_method_2() 
        {
            var x = await Task.FromResult(new Random());
            var output = await Task.FromResult(new List<int>());
            for (int t = 1; t < 13; t++)
            {
                output.Add(25 + x.Next(1, 40)); //supplies_replenish_number
            }
            return output;
        }

        public async Task<string> Getcapital(string username)
        {
            //query new capital
            var output = "";
            if (Request.Cookies["capital_" + HttpContext.Session.GetString(SessionKey.user_name)] != null)
            { output = await Task.FromResult(Request.Cookies["capital_" + HttpContext.Session.GetString(SessionKey.user_name)].ToString()); }
            else
            {
              output = "5000";
            }
            return output;
        }

         public async Task<List<string>> Openrecord(string username)
         {
            List<string> Data_collector = new List<string>();
            List<string> Goods_name_list = new List<string>();
            List<string> Goods_price_list = new List<string>();
            List<string> Goods_number_list = new List<string>();

            var goodsnames = new string[12];
            var prices = new string[12];
            var number = new string[12];

            if (Request.Cookies["goodsname_" + HttpContext.Session.GetString(SessionKey.user_name)] != null)
            {
                try
                { goodsnames = await Task.FromResult(Request.Cookies["goodsname_" + HttpContext.Session.GetString(SessionKey.user_name)].ToString().Split(",")); }
                catch
                {
                    for (var i = 0; i <= 11; i++)
                    {
                        goodsnames[i] = "";
                    }
                }
            }
            else
            {
                for(var i =0; i <= 11; i++)
                {
                    goodsnames[i] = "";
                }
            }

            if (Request.Cookies["prices_" + HttpContext.Session.GetString(SessionKey.user_name)] != null)
            {
                try
                { prices = await Task.FromResult(Request.Cookies["prices_" + HttpContext.Session.GetString(SessionKey.user_name)].ToString().Split(",")); }
                catch
                {
                    for (var i = 0; i <= 11; i++)
                    {
                        prices[i] = "";
                    }
                }
            }
            else {
                for (var i = 0; i <= 11; i++)
                {
                    prices[i] = "";
                }
            }

            if (Request.Cookies["number_" + HttpContext.Session.GetString(SessionKey.user_name)] != null)
            {
                try
                { number = await Task.FromResult(Request.Cookies["number_" + HttpContext.Session.GetString(SessionKey.user_name)].ToString().Split(",")); }
                catch
                {
                    for (var i = 0; i <= 11; i++)
                    {
                        number[i] = "";
                    }
                }
            }
            else
            {
                for (var i = 0; i <= 11; i++)
                {
                    number[i] = "";
                }
            }

            for (var i = 1; i <= 12; i++)
            {
                Goods_name_list.Add(goodsnames[i-1]);
                Goods_price_list.Add(prices[i-1]);
                Goods_number_list.Add(number[i-1]);
            }

            Data_collector.AddRange(Goods_name_list);
            Data_collector.AddRange(Goods_price_list);
            Data_collector.AddRange(Goods_number_list);
            

            return Data_collector;
         }

        //gaming view controller tasks end here


        //User Regesitration
            
            public async Task Shop_registration(string user, string password, string Repassword)
            {
                SqlConnection userinfoinject = new SqlConnection(SessionKey.connection);
                userinfoinject.Open();

                var userupdatequery = "INSERT INTO userinfo (UserName,password,Repassword) VALUES (@user,@password,@repassword)";
                var updateuserinfo = new SqlCommand(userupdatequery, userinfoinject);
                updateuserinfo.Parameters.AddWithValue("@user", user);
                updateuserinfo.Parameters.AddWithValue("@password", password);
                updateuserinfo.Parameters.AddWithValue("@repassword", Repassword);
                await updateuserinfo.ExecuteNonQueryAsync();

                userinfoinject.Close();
            }

        //break

        public async Task Upload_Icon(IFormFile P_upload,string username) {
            var end_directory = "wwwroot/Personal_Icon/";
            var file_extension = ".png";
            var file_name = new StringBuilder(username.Length + end_directory.Length+file_extension.Length);
            file_name.Append(end_directory);
            file_name.Append(username);
            file_name.Append(file_extension);
            var path =Path.Combine(Models.SessionKey.Root_path,file_name.ToString());
            try {
                using (var streaming_path = new FileStream(path,FileMode.Create))
                {
                    await P_upload.CopyToAsync(streaming_path);
                }
            }
            catch { }
            
        }
        
        public async Task<object> Gaming_json(List<string> supplies_item_nameandprices, 
            List<int> supplies_item_replienish_number, List<string> products, string capital)
        {
            var user_name = await Task.FromResult(HttpContext.Session.GetString(SessionKey.user_name));
            var end_directory = "wwwroot/Personal_Icon/";
            var file_extension = ".png";
            var file_name = new StringBuilder(user_name.Length + end_directory.Length + file_extension.Length);
            file_name.Append(end_directory);
            file_name.Append(user_name);
            file_name.Append(file_extension);
            var path = Path.Combine(Models.SessionKey.Root_path, file_name.ToString());
            var icon_path = "";
            if (!System.IO.File.Exists(path))
            {
                icon_path = "/images/Defalut_Personal_Icon.jpg";
            }
            else
            {
                icon_path = "/Personal_Icon/" + user_name + ".png";
            }

            var record = "";
            if (Request.Cookies["record_" + HttpContext.Session.GetString(SessionKey.user_name)] != null)
            { record =await Task.FromResult(Request.Cookies["record_" + HttpContext.Session.GetString(SessionKey.user_name)].ToString()); }
            else { record = await Task.FromResult("1"); }

            try
            {
                object data = new
                {
                    supplies_item_nameandprices,
                    supplies_item_replienish_number,
                    products,
                    capital,
                    icon_path,
                    record
                };
                return data;
            }
            catch
            {
                var err_message = "请等待重连";
                object data = new { err_message };
                return data;
            }
        }

        public async Task<object> cookies_loader()
        {
            var success_or_fail =await Task.FromResult("");
            object data =await Task.FromResult(new { });
            try
            {
                var cookie_option = new CookieOptions();
                cookie_option.Expires = DateTime.Now.AddMinutes(20);
                cookie_option.SameSite = SameSiteMode.Lax;
                Response.Cookies.Append("capital_" + HttpContext.Request.Form["user"].ToString(), HttpContext.Request.Form["capital"].ToString(), cookie_option);
                Response.Cookies.Append("prices_" + HttpContext.Request.Form["user"].ToString(), HttpContext.Request.Form["prices"].ToString(), cookie_option);
                Response.Cookies.Append("number_" + HttpContext.Request.Form["user"].ToString(), HttpContext.Request.Form["number"].ToString(), cookie_option);
                Response.Cookies.Append("record_" + HttpContext.Request.Form["user"].ToString(), HttpContext.Request.Form["record"].ToString(), cookie_option);
                Response.Cookies.Append("goodsname_" + HttpContext.Request.Form["user"].ToString(), HttpContext.Request.Form["goodsname"].ToString(), cookie_option);
                success_or_fail = await Task.FromResult("存储成功");
                data =await Task.FromResult(new { success_or_fail });
            }
            catch
            {
                success_or_fail = await Task.FromResult("存储失败");
                data = await Task.FromResult(new { success_or_fail });
            }

            return data;
        }

        //break
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        
        public async Task<IActionResult> Login(string username, string password)
        {
            var userinfoquery = "select UserName from userinfo where UserName = @userlogin and password = @loginpass";
            SqlConnection LOGINAUTH = await Task.FromResult(new SqlConnection(SessionKey.connection));

            var getuserdata = await Task.FromResult(username);
            var getpass = await Task.FromResult(password);

            LOGINAUTH.Open();
            SqlCommand getuserinfo = await Task.FromResult(new SqlCommand(userinfoquery, LOGINAUTH));
            await Task.Run(() => getuserinfo.Parameters.AddWithValue("@userlogin", getuserdata.ToString()));
            await Task.Run(() => getuserinfo.Parameters.AddWithValue("@loginpass", getpass.ToString()));

            await getuserinfo.ExecuteNonQueryAsync();
            SqlDataReader whetherlogin = await Task.FromResult(getuserinfo.ExecuteReader());
            if (whetherlogin.HasRows == false)
            {
                ViewBag.Message = "登陆失败";
                
            }
            else
            {
                HttpContext.Session.SetString(SessionKey.user_name,getuserdata);
                return RedirectToAction("Gaming");
            }

            return View();
        }

        [HttpPost]
        public IActionResult Gaming_data_loader() 
        {
                var supplies_item_nameandprices = Task.Run(async () => await Supplies_method_1()).Result;

                var supplies_item_replienish_number = Task.Run(async () => await Supplies_method_2()).Result;

                var products = Task.Run(async () => await Openrecord(HttpContext.Session.GetString(SessionKey.user_name))).Result;

                var capital = Task.Run(async () => await Getcapital(HttpContext.Session.GetString(SessionKey.user_name))).Result;

                var data = Task.Run(async () => await Gaming_json(supplies_item_nameandprices,
                    supplies_item_replienish_number, products, capital)).Result;
                    
                return Json(data);   
        }

        [HttpPost]
        public IActionResult Gaming_cookie()
        {
            var data =Task.Run(async()=> await cookies_loader()).Result;
            
            return Json(data);
        }

        public IActionResult Gaming(
            //submit argument is used by .net mvc api to get this type name
            //and this will be the ref to search every html element whose name attribute matches the ref
            //use switch case block, developer can easily set up different code block for 
            //each element.
            string submit)
        {
            ViewData["Shopmaster"] = "今日店长   " + HttpContext.Session.GetString(SessionKey.user_name);
            ViewData["Master"] = HttpContext.Session.GetString(SessionKey.user_name);
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Registration_submission(IFormFile personal_icon, string LOGIN,string PASS,string REPASS)
        {
            try
            {
                var Reg = Task.Run(async () => await Shop_registration(
                     await Task.FromResult(LOGIN),
                     await Task.FromResult(PASS),
                     await Task.FromResult(REPASS)));
                Reg.Wait();
                if (Reg.IsCompleted == true)
                {

                   var image = await Task.FromResult(personal_icon);
                   var user = await Task.FromResult(LOGIN);
                   var upload_job = Task.Run(async () => await Upload_Icon(image,user));
                   upload_job.Wait();
                   if (upload_job.IsCompleted == true)
                   {
                     Reg.Dispose();
                     upload_job.Dispose();
                   }
                     
                }

            }
            catch
            {
               return RedirectToAction("RegFail");
            }
            return View();
        }

        public IActionResult Registration()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
