using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Entities
{
    public class Food : FullAuditedEntity<int>
    {
        public string Image { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public int? Size { get; set; }
        public int Price { get; set; }

    }
}
