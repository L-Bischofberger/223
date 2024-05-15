package ch.wiss.m223securitsy.security;

 
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;


@Component
public class JwtUtils {
//Hilfsklasse zum Erzeugen und Validieren von JWT-Token
    private static final Logger logger =
LoggerFactory.getLogger(JwtUtils.class);
@Value("${myapp.jwtSecret}") //in application.properties
private String jwtSecret;
@Value("${myapp.jwtExpirationMs}") //application.properties
private int jwtExpirationMs;
public String generateJwtToken(Authentication authentication) {
    // JWT-Token generieren
 UserDetailsImpl userPrincipal = (UserDetailsImpl)
authentication.getPrincipal();
 return Jwts.builder()
 .setSubject((userPrincipal.getUsername()))
 .setIssuedAt(new Date())
 .setExpiration(new Date((new Date()).getTime()
 + jwtExpirationMs))
 .signWith(SignatureAlgorithm.HS512, jwtSecret)
 .compact();
}
public String getUserNameFromJwtToken(String token) {
    // Benutzernamen aus JWT-Token extrahieren
 return Jwts.parser().setSigningKey(jwtSecret)
 .parseClaimsJws(token).getBody().getSubject();
}
public boolean validateJwtToken(String authToken) {
    // JWT-Token validieren
 try {
 Jwts.parser().setSigningKey(jwtSecret)
 .parseClaimsJws(authToken);
 return true;
 } catch (SignatureException e) {
 logger.error("Invalid JWT signature: {}",
e.getMessage());
 } catch (MalformedJwtException e) {
 logger.error("Invalid JWT token: {}", e.getMessage());
 } catch (ExpiredJwtException e) {
 logger.error("JWT token is expired: {}", e.getMessage());
 } catch (UnsupportedJwtException e) {
 logger.error("JWT unsupported: {}", e.getMessage());
 } catch (IllegalArgumentException e) {
 logger.error("JWT claims empty: {}", e.getMessage());
 }
 return false;
 }
}


