using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Divisions.Dto
{
    [AutoMapFrom(typeof(Division))]
    [AutoMapTo(typeof(Division))]
    public class DivisionDto : EntityDto<int>
    {
        public string Name { get; set; }

    }
}
