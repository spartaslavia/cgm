using cgm.Api.Application;
using cgm.Api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace cgm.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly INotesService _service;

    public NotesController(INotesService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? q, CancellationToken ct)
    {
        var notes = await _service.GetAllAsync(q, ct);
        return Ok(notes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id, CancellationToken ct)
    {
        var note = await _service.GetAsync(id, ct);
        return note == null ? NotFound() : Ok(note);
    }

    [HttpPost]
    public async Task<IActionResult> Create(NoteDto dto, CancellationToken ct)
    {
        var created = await _service.CreateAsync(dto, ct);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, NoteDto dto, CancellationToken ct)
    {
        var updated = await _service.UpdateAsync(id, dto, ct);
        return updated == null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var ok = await _service.DeleteAsync(id, ct);
        return ok ? NoContent() : NotFound();
    }
}
