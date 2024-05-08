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
public List<Event> getAllEvents(Authentication authentication) {
    String currentUsername = authentication.getName();
    return eventRepository.findAll().stream()
            .filter(event -> event.isPublic() || event.getCreator().equals(currentUsername))
            .collect(Collectors.toList());
}



@PostMapping
public ResponseEntity<Event> createEvent(@RequestBody Event event, Authentication authentication) {
    System.out.println("Creating/Updating Event with isPublic: " + event.isPublic());
    String currentUsername = authentication.getName();
    event.setCreator(currentUsername);
    Event savedEvent = eventRepository.save(event);
    return ResponseEntity.ok(savedEvent);
    
}

@PutMapping("/{id}")
public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent, Authentication authentication) {
    return eventRepository.findById(id)
            .map(event -> {
                if (!event.getCreator().equals(authentication.getName())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized to update this event");
                }
                event.setTitle(updatedEvent.getTitle());
                event.setStartTime(updatedEvent.getStartTime());
                event.setEndTime(updatedEvent.getEndTime());
                event.setAllDay(updatedEvent.isAllDay());
                event.setPublic(updatedEvent.isPublic());
                eventRepository.save(event);
                return ResponseEntity.ok(event);
            })
            .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteEvent(@PathVariable Long id, Authentication authentication) {
    return eventRepository.findById(id)
            .map(event -> {
                if (event.getCreator().equals(authentication.getName())) {
                    eventRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized to delete this event");
            })
            .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}/togglePublic")
public ResponseEntity<?> toggleEventPublic(@PathVariable Long id, Authentication authentication) {
    return eventRepository.findById(id)
        .map(event -> {
            if (event.getCreator().equals(authentication.getName())) {
                event.setPublic(!event.isPublic());
                eventRepository.save(event);
                return ResponseEntity.ok(event);
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized");
        })
        .orElse(ResponseEntity.notFound().build());
}
}
