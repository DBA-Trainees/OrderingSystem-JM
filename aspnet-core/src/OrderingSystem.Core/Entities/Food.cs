using Abp.Domain.Entities.Auditing;

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
        public Category Category { get; set; } //FK
        public int? CategoryId { get; set; }
        public int? TypesId { get; set; } 

        public Types Types { get; set; } //FK
        public string? Size { get; set; }
        public double Price { get; set; }

    }
}
