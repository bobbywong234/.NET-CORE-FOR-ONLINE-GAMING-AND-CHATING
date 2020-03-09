using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Constore_Core.Models
{
    [Serializable]
    public class SessionKey
    {
        public const string user_name = "Username";

        public const string connection = "Data Source=lost\\sqlexpress;Initial Catalog=ConStore;Integrated Security=True;Pooling=True";

        public static string Root_path;
    }
}
