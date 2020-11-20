package com.ynov.dizifymusic.config;
import java.io.IOException;
import java.util.ArrayList;
<<<<<<< HEAD
=======
import java.util.Collection;
>>>>>>> develop
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
<<<<<<< HEAD
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
=======
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
>>>>>>> develop
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ynov.dizifymusic.service.JwtUserDetailService;
<<<<<<< HEAD
import com.ynov.dizifymusic.service.UserDetailsImpl;
=======
>>>>>>> develop

import io.jsonwebtoken.ExpiredJwtException;

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
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
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

		// Once we get the token validate it.
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

<<<<<<< HEAD
			UserDetailsImpl userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
=======
			UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
>>>>>>> develop

			// if token is valid configure Spring Security to manually set
			// authentication
			if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
<<<<<<< HEAD
				
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
=======

				Collection<SimpleGrantedAuthority> oldAuthorities = (Collection<SimpleGrantedAuthority>)SecurityContextHolder.getContext().getAuthentication().getAuthorities();
				SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_ANOTHER");
				List<SimpleGrantedAuthority> updatedAuthorities = new ArrayList<SimpleGrantedAuthority>();
				updatedAuthorities.add(authority);
				updatedAuthorities.addAll(oldAuthorities);
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
>>>>>>> develop
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// After setting the Authentication in the context, we specify
				// that the current user is authenticated. So it passes the
				// Spring Security Configurations successfully.
<<<<<<< HEAD
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				//System.out.println(usernamePasswordAuthenticationToken.getAuthorities());
				System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
=======
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
>>>>>>> develop
			}
		}
		chain.doFilter(request, response);
	}

}