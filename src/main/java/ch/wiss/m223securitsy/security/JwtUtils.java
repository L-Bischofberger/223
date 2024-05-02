/*package ch.wiss.m223securitsy.security;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

/**
 * Utility class for managing JWT for authentication.
 *
@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${myapp.jwtSecret}")
    private String jwtSecret;

    @Value("${myapp.jwtExpirationMs}")
    private int jwtExpirationMs;

    /**
     * Generates a JWT token containing username as subject, and userId and roles as additional claims.
     *
     * @param authentication The authentication object containing the user's details.
     * @return a signed JWT token.
     *
    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }*/

    /**
     * Gets the username from the JWT token.
     *
     * @param token JWT token
     * @return username as a string
     *
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret)
                .parseClaimsJws(token).getBody().getSubject();
    }*/

    /**
     * Validates a JWT token and logs the exception if the token is invalid.
     *
     * @param authToken JWT token to validate
     * @return true if the token is valid
     *//* 
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}*/




/**
* This class has 3 main functions:
* generateJwtToken: create JWT Token from Auth object
* getUserNameFromJwtToken: get username from JWT
* validateJwtToken: validate a JWT with a secret


änderung 29.04.2024  19:45*/

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
private static final Logger logger =
LoggerFactory.getLogger(JwtUtils.class);
@Value("${myapp.jwtSecret}") //in application.properties
private String jwtSecret;
@Value("${myapp.jwtExpirationMs}") //application.properties
private int jwtExpirationMs;
public String generateJwtToken(Authentication authentication) {
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
 return Jwts.parser().setSigningKey(jwtSecret)
 .parseClaimsJws(token).getBody().getSubject();
}
public boolean validateJwtToken(String authToken) {
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

/* 
package ch.wiss.m223securitsy.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}*/

