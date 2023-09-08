using Abp.Domain.Entities.Auditing;
using System;

namespace OrderingSystem.Entities
{
    public class Order: FullAuditedEntity<int>
    {
        public long? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int? FoodId { get; set; }
        public Food Food { get; set; }
        public string Size { get; set; }
        public int Qty { get; set; }
        public int? Status { get; set; }
        public double? Amount { get; set; }
        public Guid? OrderNumber { get; set; }
        public DateTime DateOrdered { get; set; }
    }
}
    