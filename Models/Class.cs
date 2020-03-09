using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Constore_Core.Models
{
    public class ThreadingtoDocker<T>
    {
        private void Hashing(T port_number) {  
            var hash = port_number;
            Port_hash = hash.GetHashCode();
        }

        private int Amount_of_docker;
        private int Port_hash;

        public ThreadingtoDocker(int Amount_of_docker)
        {
            this.Amount_of_docker = Amount_of_docker;
        }

        
    }
}
