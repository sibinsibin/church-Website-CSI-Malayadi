package com.malayadi.church.controller;

import com.malayadi.church.entity.Event;
import com.malayadi.church.entity.Festival;
import com.malayadi.church.entity.ServiceTime;
import com.malayadi.church.repository.EventRepository;
import com.malayadi.church.repository.FestivalRepository;
import com.malayadi.church.repository.ServiceTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ServiceTimeRepository serviceTimeRepository;

    @Autowired
    private FestivalRepository festivalRepository;

    @Autowired
    private EventRepository eventRepository;

    private boolean isAuthenticated(String authHeader) {
        // Very basic simple auth check for MVP
        // In real world, use Spring Security + JWT
        return "Bearer supersecretadmintoken".equals(authHeader);
    }

    // --- Service Times ---
    @PostMapping("/services")
    public ResponseEntity<?> createService(@RequestHeader("Authorization") String auth, @RequestBody ServiceTime service) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(serviceTimeRepository.save(service));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> deleteService(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        serviceTimeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Festivals ---
    @PostMapping("/festivals")
    public ResponseEntity<?> createFestival(@RequestHeader("Authorization") String auth, @RequestBody Festival festival) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(festivalRepository.save(festival));
    }

    @DeleteMapping("/festivals/{id}")
    public ResponseEntity<?> deleteFestival(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        festivalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Events ---
    @PostMapping("/events")
    public ResponseEntity<?> createEvent(@RequestHeader("Authorization") String auth, @RequestBody Event event) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(eventRepository.save(event));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEvent(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
