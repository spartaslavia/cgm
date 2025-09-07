using AutoMapper;
using cgm.Api.Domain;
using cgm.Api.Dtos;

namespace cgm.Api.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Note, NoteDto>().ReverseMap();
    }
}

