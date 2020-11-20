package com.ynov.dizifymusic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
=======
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
>>>>>>> develop
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ynov.dizifymusic.config.JwtTokenUtil;
import com.ynov.dizifymusic.model.JwtRequest;
import com.ynov.dizifymusic.model.JwtResponse;
import com.ynov.dizifymusic.repository.UserRepository;
import com.ynov.dizifymusic.service.JwtUserDetailService;
<<<<<<< HEAD
import com.ynov.dizifymusic.service.UserDetailsImpl;
=======
>>>>>>> develop
@RestController
public class JwtAutenticationController {

	private UserRepository userRepository;
	
	@Autowired
	JwtAutenticationController(UserRepository userRepository)
	{
		this.userRepository = userRepository;
	}
<<<<<<< HEAD
=======
	
	@Autowired
	private AuthenticationManager authenticationManager;
>>>>>>> develop

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailService userDetailsService = new JwtUserDetailService(this.userRepository);

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

<<<<<<< HEAD
		final UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEMail());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token,userDetails));
=======
		System.out.println("coucou, je suis passé dans le truc");
		//System.out.println(authenticationRequest.getEMail());
		//authenticate(authenticationRequest.getEMail(), authenticationRequest.getPassword());
		//authenticate(username, password);
		//final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEMail());
		//authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEMail());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
>>>>>>> develop
	}
	
}