﻿
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Entities
{
    public class Types : FullAuditedEntity<int>
    {
        public string Name { get; set; }
       

    }
}
