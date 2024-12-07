package com.iauro.ExpenceTracker.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iauro.ExpenceTracker.Entity.User;
import com.iauro.ExpenceTracker.Repository.UserRepository;
import com.iauro.ExpenceTracker.config.JwtUtil;
import com.iauro.ExpenceTracker.service.LoginService;
import com.iauro.ExpenceTracker.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private LoginService loginService;
	
    @Autowired
    private JwtUtil jwtUtil;

	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<Object> signUp(@RequestBody User user) {
	    user.setPassword(encoder.encode(user.getPassword()));
	    return userService.registerUser(user);
	}
    
	@PostMapping("/signin")
	public ResponseEntity<Object> signIn(@RequestBody User user) {
		User myUser = userRepository.findByUsername(user.getUsername());
		try {
			//authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
		    if (!encoder.matches(user.getPassword(), myUser.getPassword())) {
		        return new ResponseEntity<>("Invalid password", HttpStatus.BAD_REQUEST);
		    }
					    
			UserDetails userDetails = loginService.loadUserByUsername(user.getUsername());
			String jwt = jwtUtil.generateToken(userDetails);
			
			Map<String, Object> response = new HashMap<>();
			response.put("jwt", jwt);
			response.put("status", HttpStatus.OK.value());
			return ResponseEntity.ok(response);
			
		} catch (UsernameNotFoundException e) {
			return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
		}
	}
	
}
