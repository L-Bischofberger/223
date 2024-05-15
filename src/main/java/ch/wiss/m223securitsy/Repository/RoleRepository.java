package ch.wiss.m223securitsy.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.wiss.m223securitsy.security.ERole;
import ch.wiss.m223securitsy.security.Role;
//Repository-Schnittstelle für die Role-Entität.
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRole(ERole name);
}
