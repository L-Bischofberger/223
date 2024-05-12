package ch.wiss.m223securitsy.Daten;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import ch.wiss.m223securitsy.Repository.RoleRepository;
import ch.wiss.m223securitsy.Repository.UserRepository;
import ch.wiss.m223securitsy.security.ERole;
import ch.wiss.m223securitsy.security.Role;
import ch.wiss.m223securitsy.security.User;

@Component
public class DataBaseLoader implements CommandLineRunner {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
 
    @Autowired
    public DataBaseLoader(PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }
    //Hier werden die Testdaten erstellt und in die Datenbank gespeichert.
    @Override
    public void run(String... strings) throws Exception {
        // Initialisiere Rollen, falls noch nicht vorhanden
        if(roleRepository.count() == 0) {
            this.roleRepository.save(new Role(ERole.ROLE_USER));
            this.roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }

        // Füge Benutzer hinzu, falls noch keine Benutzer vorhanden sind
        if (userRepository.count() == 0) {

            User janeDoe = new User("janedoe", "jane.doe@email.com", passwordEncoder.encode("p@ssw0rd"));
            janeDoe.setRoles(new HashSet<>(Arrays.asList(roleRepository.findByRole(ERole.ROLE_USER).get())));
            this.userRepository.save(janeDoe);


            User johnDoe = new User("654321", "654321.doe@email.com", passwordEncoder.encode("654321"));
            johnDoe.setRoles(new HashSet<>(Arrays.asList(roleRepository.findByRole(ERole.ROLE_ADMIN).get())));
            this.userRepository.save(johnDoe);


            User aliceSmith = new User("1234567", "123456.doe@email.com", passwordEncoder.encode("12334567"));
            aliceSmith.setRoles(new HashSet<>(Arrays.asList(roleRepository.findByRole(ERole.ROLE_USER).get())));
            this.userRepository.save(aliceSmith);

        }
    }
}
