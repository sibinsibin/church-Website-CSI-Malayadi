package com.malayadi.church.controller;

import com.malayadi.church.entity.Event;
import com.malayadi.church.entity.Festival;
import com.malayadi.church.entity.ServiceTime;
import com.malayadi.church.repository.EventRepository;
import com.malayadi.church.repository.FestivalRepository;
import com.malayadi.church.repository.ServiceTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

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

    @GetMapping("/services")
    public List<ServiceTime> getServices() {
        return serviceTimeRepository.findAll();
    }

    @GetMapping("/festivals")
    public List<Festival> getFestivals() {
        return festivalRepository.findAll();
    }

    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/photos")
    public List<com.malayadi.church.entity.Photo> getPhotos() {
        return photoRepository.findAll();
    }

    @GetMapping("/pastor")
    public com.malayadi.church.entity.Pastor getPastor() {
        return pastorRepository.findAll().stream().findFirst().orElse(null);
    }
}
