using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Categories.Dto
{
    [AutoMapFrom(typeof(CategoriesDto))]
    [AutoMapTo(typeof(Category))]
    public class CreateCategoriesDto
    {
        public string Name { get; set; }
    }
}
