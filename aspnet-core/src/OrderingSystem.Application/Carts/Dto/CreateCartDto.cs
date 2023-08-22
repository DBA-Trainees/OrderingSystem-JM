using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapFrom(typeof(CartDto))]
    [AutoMapTo(typeof(Cart))]
    public class CreateCartDto
    {
        public int? CustomerId { get; set; }
        public int? FoodId { get; set; }
        public int Status { get; set; }
        public DateTime DateOrdered { get; set; }

    }
}
