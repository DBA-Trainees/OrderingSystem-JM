using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapFrom(typeof(Order))]
    [AutoMapTo(typeof(Order))]   
    public class OrderDto : EntityDto<int>
    {
        public Customer Customer { get; set; }
        public int? CustomerId { get; set; }

        public Food Food { get; set; }
        public int? FoodId { get; set; }

    
        public DateTime DateOrdered { get; set; }
    }
}
