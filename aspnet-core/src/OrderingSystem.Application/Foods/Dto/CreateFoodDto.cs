using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapFrom(typeof(FoodDto))]
    [AutoMapTo(typeof(Food))]
    public class CreateFoodDto
    {
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Qty { get; set; }
        public int CategoryId { get; set; } //FK
        public int TypesId { get; set; } //FK
        public string? Size { get; set; }
        public int Price { get; set; }

    }
}
