package ch.wiss.m223securitsy.security;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
 @Autowired private UserDetailsServiceImpl userDetailsService;
 @Autowired private AuthenticationEntryPoint unauthorizedHandler;
 private final static String[] EVERYONE = { "/api/auth/**", "/category", "/quiz" };
 @Bean
 public AuthTokenFilter authenticationJwtTokenFilter() {
 return new AuthTokenFilter();
 }
 @Bean
 public DaoAuthenticationProvider authenticationProvider() {
 DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(); 
 authProvider.setUserDetailsService(userDetailsService);
 authProvider.setPasswordEncoder(passwordEncoder()); 
 return authProvider;
 }
 //Erstellt und konfiguriert einen BCryptPasswordEncoder
 @Bean
 public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
 return authConfig.getAuthenticationManager();
 }
 @Bean
public PasswordEncoder passwordEncoder() { 
 return new BCryptPasswordEncoder();
}
 
@Bean
//Konfiguriert die Sicherheitsfilterkette
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
 http.csrf(csrf -> csrf.disable()).cors(Customizer.withDefaults())
 .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
 .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
 .authorizeHttpRequests(auth ->
 auth.requestMatchers(EVERYONE).permitAll()
 .anyRequest().authenticated()
 ); 
 http.authenticationProvider(authenticationProvider());
 http.addFilterBefore(authenticationJwtTokenFilter(),
 UsernamePasswordAuthenticationFilter.class); 
 return http.build();
 }
 @Bean
 //Konfiguriert die CORS-Einstellungen
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
 @Bean
 //Konfiguriert CORS-Mappings für das Framework
 public WebMvcConfigurer corsConfigurer() {
 return new WebMvcConfigurer() {
 @Override
 public void addCorsMappings(CorsRegistry registry) {
 registry.addMapping("/**")
 .allowedOrigins("http://localhost:5173");
 }
 };
 }
}