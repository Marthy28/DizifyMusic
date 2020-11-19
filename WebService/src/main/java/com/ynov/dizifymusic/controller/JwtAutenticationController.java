package com.ynov.dizifymusic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ynov.dizifymusic.config.JwtTokenUtil;
import com.ynov.dizifymusic.model.JwtRequest;
import com.ynov.dizifymusic.model.JwtResponse;
import com.ynov.dizifymusic.repository.UserRepository;
import com.ynov.dizifymusic.service.JwtUserDetailService;
import com.ynov.dizifymusic.service.UserDetailsImpl;
@RestController
public class JwtAutenticationController {

	private UserRepository userRepository;
	
	@Autowired
	JwtAutenticationController(UserRepository userRepository)
	{
		this.userRepository = userRepository;
	}

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailService userDetailsService = new JwtUserDetailService(this.userRepository);

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		final UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEMail());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
}