﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapFrom(typeof(Food))]
    [AutoMapTo(typeof(Food))]   
    public class FoodDto : EntityDto<int>
    {
        public string Image { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Qty { get; set; }
        public string Category { get; set; } //FK
        public string Type { get; set; } //FK
        public int? Size { get; set; }
        public int Price { get; set; }
    }
}