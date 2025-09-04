using AutoMapper;
using cgm.Api.Domain;
using cgm.Api.Dtos;
using cgm.Api.Infrastructure;

namespace cgm.Api.Application;

public class NotesService : INotesService
{
    private readonly INotesRepository _repo;
    private readonly IMapper _mapper;

    public NotesService(INotesRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<NoteDto>> GetAllAsync(string? q, CancellationToken ct)
    {
        var notes = await _repo.GetAllAsync(q, ct);
        return notes.Select(_mapper.Map<NoteDto>);
    }

    public async Task<NoteDto?> GetAsync(Guid id, CancellationToken ct)
    {
        var note = await _repo.GetAsync(id, ct);
        return note == null ? null : _mapper.Map<NoteDto>(note);
    }

    public async Task<NoteDto> CreateAsync(NoteDto dto, CancellationToken ct)
    {
        var note = _mapper.Map<Note>(dto);
        note.CreatedAt = note.UpdatedAt = DateTime.UtcNow;
        note = await _repo.AddAsync(note, ct);
        return _mapper.Map<NoteDto>(note);
    }

    public async Task<NoteDto?> UpdateAsync(Guid id, NoteDto dto, CancellationToken ct)
    {
        var existing = await _repo.GetAsync(id, ct);
        if (existing == null) return null;
        existing.Title = dto.Title;
        existing.Content = dto.Content;
        existing.UpdatedAt = DateTime.UtcNow;
        var updated = await _repo.UpdateAsync(existing, ct);
        return updated == null ? null : _mapper.Map<NoteDto>(updated);
    }

    public Task<bool> DeleteAsync(Guid id, CancellationToken ct) => _repo.DeleteAsync(id, ct);
}


