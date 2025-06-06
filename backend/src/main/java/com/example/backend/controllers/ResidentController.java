package com.example.backend.controllers;


import com.example.backend.dtos.ResidentDTO;
import com.example.backend.services.ResidentService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/residents")
@RequiredArgsConstructor
public class ResidentController {
    private final ResidentService residentService;

    @GetMapping
    public ResponseEntity<Page<ResidentDTO>> getAll(@RequestParam(value = "page", defaultValue = "1") int page,
                                                    @RequestParam(value = "limit", defaultValue = "20") int limit,
                                                    @RequestParam(value = "search", required = false) String search,
                                                    @RequestParam(value = "gender", required = false) String gender) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "id"));
        return ResponseEntity.ok(residentService.getAllResidents(pageable, search, gender));
    }

    @PostMapping
    public ResponseEntity<ResidentDTO> saveResident(@RequestBody JsonNode data) {
        ResidentDTO savedResident = residentService.saveResident(data);
        return new ResponseEntity<>(savedResident, HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ResidentDTO> updateResident(@PathVariable("id") Long id, @RequestParam(value = "imageFile") MultipartFile imageFile) {
        ResidentDTO updatedResident = residentService.updateResident(id, imageFile);
        return new ResponseEntity<>(updatedResident, HttpStatus.OK);
    }

    // Cập nhật thông tin Resident theo ID
    @PutMapping("/{id}")
    public ResponseEntity<ResidentDTO> updateResident(@RequestBody JsonNode data, @PathVariable Long id) {
        ResidentDTO updatedResident = residentService.updateResident(data, id);
        return ResponseEntity.ok(updatedResident);
    }

    // Xóa Resident theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResident(@PathVariable Long id) {
        residentService.deleteResident(id);
        return ResponseEntity.noContent().build();
    }
}
