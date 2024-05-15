package ch.wiss.m223securitsy.controllerTests;

import ch.wiss.m223securitsy.Request.LoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class EntryControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    //Test zum überprüfen ob ein benuzer einen eintrag ertellen kann
    //Erwartedes ergebnis er kann es
    @Test
    public void testEintragErstellen() throws Exception {
        // Benutzeranmeldung
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("user3");
        loginRequest.setPassword("user123");

        MvcResult result = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        String token = JsonPath.parse(responseBody).read("$.accessToken");
//eintrag erstellen
        String newEntryJson = "{"
                + "\"title\": \"test1\","
                + "\"startTime\": \"2024-05-10T10:30:00.000+02:00\","
                + "\"endTime\": \"2024-05-10T11:00:00.000+02:00\","
                + "\"description\": \"teest12\","
                + "\"location\": \"test1\","
                + "\"public\": true,"
                + "\"allDay\": false"
                + "}";

        mockMvc.perform(post("/api/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(newEntryJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.title").value("test1"))
                .andExpect(jsonPath("$.startTime").value("2024-05-10T10:30:00.000+02:00"))
                .andExpect(jsonPath("$.endTime").value("2024-05-10T11:00:00.000+02:00"))
                .andExpect(jsonPath("$.description").value("teest12"))
                .andExpect(jsonPath("$.location").value("test1"))
                .andExpect(jsonPath("$.public").value(true))
                .andExpect(jsonPath("$.allDay").value(false));
    }
}


