using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Constore_Core.Models
{
    public class BackEndParameters
    {
        public static readonly string[] supplyitem = {"USB线", "包子", "充电宝" , "蛋糕" ,
        "豆奶","饭团", "关东煮","果汁","红烧牛肉面","花生米","鸡仔饼","咖啡","咖喱鱼丸",
        "烤香肠","可乐","绿茶","美味棒","面包","奶茶","奶昔","能量饮料","牛奶","糯米糍",
        "啤酒","巧克力","薯片","酸奶","甜甜圈","威化饼","仙贝","香烟","杏仁","雪糕",
        "雨伞","杂志","纸巾"};

        public static readonly int[] supplybasicprice =
        {
        8, 2, 12, 3, 1, 2, 3, 2, 2, 1, //10
        2, 4, 4, 2, 2, 2, 1, 2, 4, 4, //20
        2, 2, 3, 2, 2, 2, 4, 1, 1, 1, //30
        10, 7, 5, 9, 2, 1
        };

        #region Params of Goods
        public static readonly string[] Query_params_names =
        {
         "Name1","Name2","Name3","Name4","Name5","Name6","Name7","Name8","Name9","Name10",
         "Name11","Name12","Name13","Name14","Name15","Name16","Name17","Name18"
        };

        public static readonly string[] Query_params_prices =
        {
           "price1","price2","price3","price4","price5","price6","price7","price8","price9",
           "price10","price11","price12","price13","price14","price15","price16","price17","price18"
        };

        public static readonly string[] Query_params_numbers =
        {
            "number1","number2","number3","number4","number5","number6","number7","number8","number9",
            "number10","number11","number12","number13","number14","number15","number16","number17","number18"
        };
        #endregion

    }
}
