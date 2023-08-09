using Abp.Domain.Entities.Auditing;
using Microsoft.VisualBasic;
using System;

namespace OrderingSystem.Entities
{
    public class Order: FullAuditedEntity<int>
    {
        //customer name food name qty size notes date and time

        public Customer Customer { get; set; }
        public int? CustomerId { get; set; }

        public Food Food { get; set; }
        public int? FoodId { get; set; }
        
      
        public DateTime DateOrdered { get; set; }
    }
}
    