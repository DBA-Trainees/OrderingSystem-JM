using Abp.Domain.Entities.Auditing;
using OrderingSystem.Authorization.Users;

namespace OrderingSystem.Entities
{
    public class Customer: FullAuditedEntity<long>
    {
        public int? DivisionId { get; set; }
        public Division Division { get; set; }
        public User User { get; set; }
        public long? UserId { get; set; }
    }
}
