package ch.wiss.m223securitsy.security;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

                /*public class AuthTokenFilter extends OncePerRequestFilter {

                    @Autowired
                    private JwtUtils jwtUtils;

                    @Autowired
                    private UserDetailsService userDetailsService;

                    @Override
                    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                            throws ServletException, IOException {
                        try {
                            String jwt = jwtUtils.parseJwt(request);
                            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                                SecurityContextHolder.getContext().setAuthentication(authentication);
                            }
                        } catch (Exception e) {
                            logger.error("Cannot set user authentication: {}", e.getMessage());
                        }

                        filterChain.doFilter(request, response);
                    }
                /**
                * a filter that executes once per request. AuthTokenFilter class that extends OncePerRequestFilter and overrides doFilterInternal() method. 
                */ 

             
public class AuthTokenFilter extends OncePerRequestFilter {
 @Autowired
 private JwtUtils jwtUtils;
 @Autowired 
 private UserDetailsServiceImpl userDetailsService;
 private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
 @Override
 protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
 try {
 String jwt = parseJwt(request);
 if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
 String username = jwtUtils.getUserNameFromJwtToken(jwt);
 UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(username);
 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
 authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
 SecurityContextHolder.getContext().setAuthentication(authentication);
 }
 } catch (Exception e) {
 logger.error("Cannot set user authentication: {}", e);
 }
 filterChain.doFilter(request, response);
 }
 private String parseJwt(HttpServletRequest request) {
 String headerAuth = request.getHeader("Authorization");
 if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
 return headerAuth.substring(7, headerAuth.length());
 }
 return null;
 } } 
                
                /*
                @Override
                protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                        throws ServletException, IOException {
                    // TODO Auto-generated method stub
                    throw new UnsupportedOperationException("Unimplemented method 'doFilterInternal'");
                }
                }*/
