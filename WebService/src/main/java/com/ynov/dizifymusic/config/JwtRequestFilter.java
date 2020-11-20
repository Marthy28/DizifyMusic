package com.ynov.dizifymusic.config;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ynov.dizifymusic.service.JwtUserDetailService;
import com.ynov.dizifymusic.service.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;

/**
 * Classe pour la filtration et la creation 
 * de l'objet UsernamePasswordAuthenticationToken
 * utilisé pour obtenir les informations de connexion de la personne
 */
@Configuration
public class JwtRequestFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUserDetailService jwtUserDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		final String requestTokenHeader = request.getHeader("Authorization");

		String username = null;
		String jwtToken = null;
		// vérification du token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		} 
		
		else {
			logger.warn("JWT Token does not begin with Bearer String");
		}

		// Quand on a obtenu le token 
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetailsImpl userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
			// Si le token est valide on passe à la configuration
			
			if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
				
				//l'objet SimpleGrantedAuthority est utilisé pour définir le rôle d'un utilisateur
				SimpleGrantedAuthority authority;
				
				if (userDetails.getAdministrator() != null)
				{
					authority = new SimpleGrantedAuthority("ADMIN");
				}
				else {
					authority = new SimpleGrantedAuthority("USER");
				}
				
				 
				List<GrantedAuthority> updatedAuthorities = new ArrayList<GrantedAuthority>();
				updatedAuthorities.add(authority);
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, updatedAuthorities);

				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// après avoir défini le token 
				// dela signifie que la personne est identifiée
				// et que spring security est passé
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		chain.doFilter(request, response);
	}

}