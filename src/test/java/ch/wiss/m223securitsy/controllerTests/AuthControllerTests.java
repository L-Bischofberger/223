package ch.wiss.m223securitsy.controllerTests;

import ch.wiss.m223securitsy.Request.LoginRequest;
import ch.wiss.m223securitsy.Request.SignupRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;
import java.util.Set;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    //Test zum überprüfen ob sich ein benuzer registrieren kann
    //Erwartedes ergebnis er kann es
    @Test
    public void testBenutzerRegistrierung() throws Exception {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("user3");
        signupRequest.setEmail("user3@example.com");
        signupRequest.setRole(Set.of("user"));
        signupRequest.setPassword("user123");

        MvcResult result = mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        System.out.println("Response Body (Signup): " + responseBody);
    }
    //Test zum überprüfen ob sich ein benuzer anmelden kann
    //Erwartedes ergebnis er kann es
    @Test
    public void testBenutzerAnmeldung() throws Exception {
        //einen benuzer erstellen
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("user4");
        signupRequest.setEmail("user4@example.com");
        signupRequest.setRole(Set.of("user"));
        signupRequest.setPassword("user123");

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isOk());

        // Benutzeranmeldung
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("user4");
        loginRequest.setPassword("user123");

        MvcResult result = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        System.out.println("Response Body (Signin): " + responseBody);


        mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andExpect(jsonPath("$.username").value("user4"))
                .andExpect(jsonPath("$.email").value("user4@example.com"))
                .andExpect(jsonPath("$.roles").isArray());
    }
}

