package ch.wiss.m223securitsy.Repository;
//Repository-Schnittstelle für die Event-Entität
import org.springframework.data.jpa.repository.JpaRepository;
import ch.wiss.m223securitsy.security.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
}
