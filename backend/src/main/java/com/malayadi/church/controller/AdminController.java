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

    @Autowired
    private com.malayadi.church.repository.PhotoRepository photoRepository;

    @Autowired
    private com.malayadi.church.repository.PastorRepository pastorRepository;

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

    // --- Photos ---
    @PostMapping("/photos/upload")
    public ResponseEntity<?> uploadPhoto(@RequestHeader("Authorization") String auth,
                                         @RequestParam("file") org.springframework.web.multipart.MultipartFile file,
                                         @RequestParam("description") String description) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        try {
            java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads");
            if (!java.nio.file.Files.exists(uploadDir)) {
                java.nio.file.Files.createDirectories(uploadDir);
            }
            // Sanitize filename and add timestamp
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
            java.nio.file.Path filePath = uploadDir.resolve(fileName);
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            com.malayadi.church.entity.Photo photo = new com.malayadi.church.entity.Photo();
            photo.setUrl("http://localhost:8080/uploads/" + fileName);
            photo.setDescription(description);
            return ResponseEntity.ok(photoRepository.save(photo));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @DeleteMapping("/photos/{id}")
    public ResponseEntity<?> deletePhoto(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        photoRepository.findById(id).ifPresent(photo -> {
            try {
                String fileName = photo.getUrl().substring(photo.getUrl().lastIndexOf("/") + 1);
                java.nio.file.Files.deleteIfExists(java.nio.file.Paths.get("uploads", fileName));
            } catch (Exception ignored) {}
            photoRepository.delete(photo);
        });
        return ResponseEntity.ok().build();
    }

    // --- Pastor ---
    @PostMapping("/pastor/upload")
    public ResponseEntity<?> uploadPastorPhoto(@RequestHeader("Authorization") String auth,
                                               @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        try {
            java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads");
            if (!java.nio.file.Files.exists(uploadDir)) {
                java.nio.file.Files.createDirectories(uploadDir);
            }
            
            String fileName = "pastor_" + System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
            java.nio.file.Path filePath = uploadDir.resolve(fileName);
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            // clear old pastor photo if exists
            pastorRepository.findAll().forEach(pastor -> {
                try {
                    String oldFileName = pastor.getPhotoUrl().substring(pastor.getPhotoUrl().lastIndexOf("/") + 1);
                    java.nio.file.Files.deleteIfExists(java.nio.file.Paths.get("uploads", oldFileName));
                } catch (Exception ignored) {}
                pastorRepository.delete(pastor);
            });

            com.malayadi.church.entity.Pastor pastor = new com.malayadi.church.entity.Pastor();
            pastor.setPhotoUrl("http://localhost:8080/uploads/" + fileName);
            return ResponseEntity.ok(pastorRepository.save(pastor));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload pastor image");
        }
    }
}
