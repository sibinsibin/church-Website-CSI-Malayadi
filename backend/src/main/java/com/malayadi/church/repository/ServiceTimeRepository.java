package com.malayadi.church.repository;

import com.malayadi.church.entity.ServiceTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTimeRepository extends JpaRepository<ServiceTime, Long> {
}
