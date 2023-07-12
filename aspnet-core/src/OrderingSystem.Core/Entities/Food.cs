using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Entities
{ 
    public class Food : FullAuditedEntity<int>
    {
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Qty { get; set; }
        public string Category { get; set; } //FK
        public string Type { get; set; } //FK
        public string? Size { get; set; }
        public int Price { get; set; }

    }
}
