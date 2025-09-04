using System.Text.Json;
using cgm.Api.Domain;
using Microsoft.Extensions.Options;

namespace cgm.Api.Infrastructure;

public class StorageOptions
{
    public string Path { get; set; } = "data/notes.json";
}

public class FileNotesRepository : INotesRepository
{
    private readonly string _filePath;
    private readonly SemaphoreSlim _lock = new(1, 1);
    private readonly JsonSerializerOptions _jsonOptions = new() { WriteIndented = true };

    public FileNotesRepository(IOptions<StorageOptions> options)
    {
        _filePath = options.Value.Path;
        var dir = System.IO.Path.GetDirectoryName(_filePath);
        if (!string.IsNullOrWhiteSpace(dir) && !Directory.Exists(dir))
            Directory.CreateDirectory(dir);
        if (!File.Exists(_filePath)) File.WriteAllText(_filePath, "[]");
    }

    public async Task<IEnumerable<Note>> GetAllAsync(string? query = null, CancellationToken ct = default)
    {
        var notes = await ReadAsync(ct);
        var filtered = notes.Where(n => !n.IsDeleted);
        if (!string.IsNullOrWhiteSpace(query))
        {
            query = query.ToLower();
            filtered = filtered.Where(n => n.Title.ToLower().Contains(query) || n.Content.ToLower().Contains(query));
        }
        return filtered.OrderByDescending(n => n.UpdatedAt);
    }

    public async Task<Note?> GetAsync(Guid id, CancellationToken ct = default)
    {
        var notes = await ReadAsync(ct);
        return notes.FirstOrDefault(n => n.Id == id && !n.IsDeleted);
    }

    public async Task<Note> AddAsync(Note note, CancellationToken ct = default)
    {
        var notes = await ReadAsync(ct);
        notes.Add(note);
        await WriteAsync(notes, ct);
        return note;
    }

    public async Task<Note?> UpdateAsync(Note note, CancellationToken ct = default)
    {
        var notes = await ReadAsync(ct);
        var idx = notes.FindIndex(n => n.Id == note.Id);
        if (idx == -1) return null;
        note.UpdatedAt = DateTime.UtcNow;
        notes[idx] = note;
        await WriteAsync(notes, ct);
        return note;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var notes = await ReadAsync(ct);
        var target = notes.FirstOrDefault(n => n.Id == id);
        if (target == null) return false;
        target.IsDeleted = true;
        target.UpdatedAt = DateTime.UtcNow;
        await WriteAsync(notes, ct);
        return true;
    }

    private async Task<List<Note>> ReadAsync(CancellationToken ct)
    {
        await _lock.WaitAsync(ct);
        try
        {
            await using var stream = File.OpenRead(_filePath);
            var notes = await JsonSerializer.DeserializeAsync<List<Note>>(stream, _jsonOptions, ct) ?? new();
            return notes;
        }
        finally
        {
            _lock.Release();
        }
    }

    private async Task WriteAsync(List<Note> notes, CancellationToken ct)
    {
        await _lock.WaitAsync(ct);
        try
        {
            await using var stream = File.Create(_filePath);
            await JsonSerializer.SerializeAsync(stream, notes, _jsonOptions, ct);
        }
        finally
        {
            _lock.Release();
        }
    }
}
