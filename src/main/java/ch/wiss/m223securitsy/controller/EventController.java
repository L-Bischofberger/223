package ch.wiss.m223securitsy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import ch.wiss.m223securitsy.Repository.EventRepository;
import ch.wiss.m223securitsy.security.Event;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    // Ruft alle Einträge für den aktuellen Benutzer ab
    public List<Event> getAllEvents(Authentication authentication) {
        String currentUsername = authentication.getName();
        return eventRepository.findAll().stream()
                .filter(event -> event.isPublic() || event.getCreator().equals(currentUsername))
                .collect(Collectors.toList());
    }

    @PostMapping
    // Erstellt einen neuen Eintrag
    public ResponseEntity<Event> createEvent(@RequestBody Event event, Authentication authentication) {
        String currentUsername = authentication.getName();
        event.setCreator(currentUsername);
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }

    @PutMapping("/{id}")
    // Aktualisiert eine vorhandenen Eintrag
    //Wen der Benuzer nich ein andmin ist und auch nicht der erteller des eintrages kann er nur die Beschreibung ändern.
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent, Authentication authentication) {
        return eventRepository.findById(id)
                .map(event -> {
                    if (!event.getCreator().equals(authentication.getName()) && !isAdmin(authentication)) {
                        event.setDescription(updatedEvent.getDescription());
                        eventRepository.save(event);
                        return ResponseEntity.ok(event);
                    }
                    event.setTitle(updatedEvent.getTitle());
                    event.setStartTime(updatedEvent.getStartTime());
                    event.setEndTime(updatedEvent.getEndTime());
                    event.setAllDay(updatedEvent.isAllDay());
                    event.setPublic(updatedEvent.isPublic());
                    event.setDescription(updatedEvent.getDescription());
                    event.setLocation(updatedEvent.getLocation());
                    eventRepository.save(event);
                    return ResponseEntity.ok(event);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    // Löscht einen Eintrag wen der benuzer ihn erstelt hat oder es ein admin ist.
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, Authentication authentication) {
        return eventRepository.findById(id)
                .map(event -> {
                    if (event.getCreator().equals(authentication.getName()) || isAdmin(authentication)) {
                        eventRepository.deleteById(id);
                        return ResponseEntity.ok().build();
                    }
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized to delete this event");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/togglePublic")
    // Schaltet den öffentlichen Status eines Eintrages um
    public ResponseEntity<?> toggleEventPublic(@PathVariable Long id, Authentication authentication) {
        return eventRepository.findById(id)
            .map(event -> {
                if (event.getCreator().equals(authentication.getName()) || isAdmin(authentication)) {
                    event.setPublic(!event.isPublic());
                    eventRepository.save(event);
                    return ResponseEntity.ok(event);
                }
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized");
            })
            .orElse(ResponseEntity.notFound().build());
    }

    private boolean isAdmin(Authentication authentication) {
        // Prüft, ob der aktuelle Benutzer die Admin-Rolle hat
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }
}
