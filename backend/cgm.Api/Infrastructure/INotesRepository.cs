using cgm.Api.Domain;

namespace cgm.Api.Infrastructure;

public interface INotesRepository
{
    Task<IEnumerable<Note>> GetAllAsync(string? query = null, CancellationToken ct = default);
    Task<Note?> GetAsync(Guid id, CancellationToken ct = default);
    Task<Note> AddAsync(Note note, CancellationToken ct = default);
    Task<Note?> UpdateAsync(Note note, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}


