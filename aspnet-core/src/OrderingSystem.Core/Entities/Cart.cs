using Abp.Domain.Entities.Auditing;
using System;

namespace OrderingSystem.Entities
{
    public class Cart : FullAuditedEntity<int>
    {
        public Customer Customer { get; set; }
        public Food Food { get; set; }
        public int? CustomerId { get; set; }
        public int? FoodId { get; set; }
        public int Status { get; set; }
        public DateTime DateOrdered { get; set; }
    }
}
