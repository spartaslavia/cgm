
using cgm.Api.Dtos;

namespace cgm.Api.Application
{
    public interface INotesService
    {
        Task<NoteDto> CreateAsync(NoteDto dto, CancellationToken ct);
        Task<bool> DeleteAsync(Guid id, CancellationToken ct);
        Task<IEnumerable<NoteDto>> GetAllAsync(string? q, CancellationToken ct);
        Task<NoteDto?> GetAsync(Guid id, CancellationToken ct);
        Task<NoteDto?> UpdateAsync(Guid id, NoteDto dto, CancellationToken ct);
    }
}